/**
 * PDF Generation Script
 *
 * Generates a PDF version of the resume for each configured language using
 * headless Chrome (Puppeteer). The output is pixel-perfect because it renders
 * the exact same React app that visitors see.
 *
 * Usage:
 *   npm run generate-pdf                  # auto-detect theme, build first
 *   npm run generate-pdf -- --theme=dark  # force dark mode
 *   npm run generate-pdf -- --theme=light # force light mode
 *   npm run generate-pdf -- --no-build    # skip the build step (faster iteration)
 *
 * The PDFs are saved to public/cv/<lang>/resume.pdf and are auto-detected by
 * the PdfDownload button on the next `npm run build`.
 */

import puppeteer from "puppeteer";
import { spawn, execSync } from "child_process";
import net from "net";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 4173;
const PDF_FILENAME = "resume_CHIKHI.pdf";

// A4 dimensions in CSS pixels at Chrome's PDF resolution (96 dpi)
// 210mm / 25.4 * 96 = 793.7px  |  297mm / 25.4 * 96 = 1122.52px
const A4_WIDTH_PX = 793.7;
const A4_HEIGHT_PX = 1122.52;

// Viewport width determines the scale (portrait A4 = 794px wide).
// Height is derived so that content at that scale fills A4 exactly.
const VIEWPORT_WIDTH = 1024;
const SCALE = A4_WIDTH_PX / VIEWPORT_WIDTH; // ≈ 0.775
const VIEWPORT_HEIGHT = Math.ceil(A4_HEIGHT_PX / SCALE); // ≈ 1449

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const cliArgs = process.argv.slice(2);
const themeFlag = cliArgs.find((a) => a.startsWith("--theme="))?.split("=")[1];
const skipBuild = cliArgs.includes("--no-build");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function waitForPort(port, timeoutMs = 20_000) {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + timeoutMs;
    (function attempt() {
      const socket = new net.Socket();
      socket.setTimeout(500);
      socket.on("connect", () => {
        socket.destroy();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        retry();
      });
      socket.on("timeout", () => {
        socket.destroy();
        retry();
      });
      socket.connect(port, "127.0.0.1");
      function retry() {
        if (Date.now() >= deadline)
          reject(new Error(`Port ${port} still not open after ${timeoutMs}ms`));
        else setTimeout(attempt, 250);
      }
    })();
  });
}

function readLanguages() {
  try {
    const src = fs.readFileSync(
      path.join(ROOT, "src/data/resume-config.ts"),
      "utf8",
    );
    const match = src.match(/available\s*:\s*\[([^\]]+)\]/);
    if (match) {
      return [...match[1].matchAll(/"([^"]+)"/g)].map(([, lang]) => lang);
    }
  } catch {
    /* fall through */
  }
  return ["fr", "en"];
}

async function probeTheme(browser, baseUrl) {
  if (themeFlag === "dark" || themeFlag === "light") return themeFlag;

  const page = await browser.newPage();
  try {
    await page.goto(baseUrl, {
      waitUntil: "domcontentloaded",
      timeout: 15_000,
    });
    const isDark = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    return isDark ? "dark" : "light";
  } finally {
    await page.close();
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const languages = readLanguages();

  if (skipBuild) {
    console.log("⏭️   Skipping build (--no-build)\n");
  } else {
    console.log("🔨  Building app (VITE_BASE_PATH=/)…");
    execSync("npm run build", {
      cwd: ROOT,
      env: { ...process.env, VITE_BASE_PATH: "/" },
      stdio: "inherit",
    });
  }

  console.log("\n🚀  Starting preview server on port", PORT, "…");
  const server = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    {
      cwd: ROOT,
      env: { ...process.env, VITE_BASE_PATH: "/" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.stdout.on("data", (d) => process.stdout.write(d));
  server.stderr.on("data", (d) => process.stderr.write(d));

  try {
    await waitForPort(PORT);
    console.log(`   Server ready → http://localhost:${PORT}/\n`);

    // Launch headless Chrome
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      // Probe which theme the app applies by default (no localStorage preset)
      const theme = await probeTheme(browser, `http://localhost:${PORT}/`);
      console.log(`🎨  Theme detected: ${theme}\n`);

      for (const lang of languages) {
        const url = `http://localhost:${PORT}/?lang=${lang}`;
        const outDir = path.join(ROOT, "public", "cv", lang);
        const outFile = path.join(outDir, PDF_FILENAME);

        if (fs.existsSync(outDir)) {
          for (const f of fs
            .readdirSync(outDir)
            .filter((f) => f.endsWith(".pdf"))) {
            fs.unlinkSync(path.join(outDir, f));
            console.log(`   🗑️  Removed old PDF: public/cv/${lang}/${f}`);
          }
        }
        fs.mkdirSync(outDir, { recursive: true });

        console.log(`📄  [${lang.toUpperCase()}] Rendering ${url} …`);
        const page = await browser.newPage();

        // Pre-set localStorage before the app boots so the correct theme is applied.
        // This mirrors what a user with that preference stored in their browser sees.
        await page.evaluateOnNewDocument((t) => {
          localStorage.setItem("resume-theme", t);
        }, theme);

        await page.setViewport({
          width: VIEWPORT_WIDTH,
          height: VIEWPORT_HEIGHT,
          deviceScaleFactor: 1,
        });

        await page.goto(url, { waitUntil: "networkidle0", timeout: 30_000 });

        // Let framer-motion entrance animations finish before capturing
        await new Promise((r) => setTimeout(r, 1200));

        // Hide interactive UI elements (top bar + hint) so they don't consume space.
        // Also neutralise the 3D flip-card on the profile photo: Puppeteer's PDF
        // renderer flattens preserve-3d contexts, making backface-hidden faces
        // invisible. We show the front face and hide the back face explicitly.
        await page.addStyleTag({
          content: `
          [data-pdf-hide] { display: none !important; }
          [data-pdf-only] { display: flex !important; }

          /* Remove outer wrapper padding so the card fills the full A4 width */
          [data-pdf-container] {
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }

          /* Stretch card to fill the full page height — no rounded corners or shadow at edges */
          [data-pdf-container] > div:not([data-pdf-hide]) {
            min-height: 100vh !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
          /* Flex row (sidebar + main) must inherit the full height */
          [data-pdf-container] > div:not([data-pdf-hide]) > div {
            min-height: 100vh !important;
          }

          body { background: transparent !important; }

          /* Neutralise 3D flip card — show front face, hide back face */
          [style*="preserve-3d"] { transform-style: flat !important; }
          [style*="preserve-3d"] > * { backface-visibility: visible !important; }
          [style*="preserve-3d"] > [style*="rotateY(180deg)"] { display: none !important; }

          /* Enlarge profile photo (128px → 160px before scale) */
          [style*="preserve-3d"] { width: 160px !important; height: 160px !important; }
        `,
        });

        // Scroll to the bottom and back to trigger any remaining lazy-loaded assets
        // (primarily the profile photo which uses loading="lazy" in some browsers)
        await page.evaluate(() =>
          window.scrollTo(0, document.body.scrollHeight),
        );
        await page.evaluate(() => window.scrollTo(0, 0));
        // Wait for every <img> to finish loading
        await page.evaluate(() =>
          Promise.all(
            [...document.images].map((img) =>
              img.complete
                ? Promise.resolve()
                : new Promise((r) => {
                    img.onload = r;
                    img.onerror = r;
                  }),
            ),
          ),
        );

        // Scale is fixed by viewport width: SCALE = A4_WIDTH / VIEWPORT_WIDTH.
        // VIEWPORT_HEIGHT was already set to exactly fill A4 at this scale.
        const scale = SCALE;
        console.log(
          `   📐  ${VIEWPORT_WIDTH}×${VIEWPORT_HEIGHT}px  →  scale: ${scale.toFixed(3)}`,
        );

        await page.pdf({
          path: outFile,
          format: "A4",
          printBackground: true,
          scale,
          margin: { top: "0", right: "0", bottom: "0", left: "0" },
        });

        await page.close();
        console.log(`   ✅  Saved → public/cv/${lang}/${PDF_FILENAME}\n`);
      }
    } finally {
      await browser.close();
    }

    console.log(
      "✨  Done! Run `npm run build` again to include the generated PDFs in your deployment.",
    );
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error("\n❌  PDF generation failed:", err.message);
  process.exit(1);
});
