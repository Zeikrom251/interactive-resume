import type { ResumeConfig } from "./types";

export const resumeConfig: ResumeConfig = {
  /* ==== PERSONAL INFO ==== */
  personal: {
    name: "Ryan Ramdane Chikhi",
    photo: "/images/P1199690.jpg",
    photoBackEmoji: "👨‍💻",
    title: {
      en: "Fullstack Developer",
      fr: "Développeur Full Stack",
    },
    subtitle: {
      fr: "Développeur fullstack junior (1 an d'expérience) travaillant principalement avec React, Node.js et TypeScript. Sérieux, impliqué et en constante progression.\n\nDisponible à partir du 09 Mars 2026",
      en: "Junior fullstack developer (1 year of experience) working mainly with React, Node.js and TypeScript. Serious, committed and constantly improving.\n\nAvailable from March 9, 2026",
    },
    location: "Paris, France",
  },

  /* ==== SEO (used in <head> meta tags) ==== */
  seo: {
    title: "Ryan Chikhi - Développeur Full Stack",
    description:
      "CV interactif de Ryan Chikhi, développeur fullstack junior basé à Paris. Découvrez ses compétences, expériences et projets.",
  },

  /* ==== LANGUAGES ==== */
  languages: {
    default: "fr",
    available: ["en", "fr"],
    labels: {
      en: "EN",
      fr: "FR",
    },
  },

  /* ==== CONTACT ==== */
  contact: [
    {
      type: "phone",
      label: "+33 7 66 19 87 51",
    },
    {
      type: "email",
      label: "ryanechikhi2004@gmail.com",
      href: "mailto:ryanechikhi2004@gmail.com",
    },
    {
      type: "location",
      label: "Paris, 75015, France",
    },
    {
      type: "github",
      label: "github.com/ryan_chikhi",
      href: "https://github.com/Zeikrom251",
    },
  ],

  /* ==== SKILLS ==== */
  skills: [
    {
      title: { en: "Frontend", fr: "Frontend" },
      type: "badges",
      items: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React" },
      ],
    },
    {
      title: { en: "Backend", fr: "Backend" },
      type: "badges",
      items: [
        { name: "Node.js" },
        { name: "NestJS" },
        { name: "Discord.js" },
        { name: "GraphQL" },
      ],
    },
    {
      title: { en: "Database", fr: "Base de données" },
      type: "badges",
      items: [{ name: "MySQL" }, { name: "PostgreSQL" }],
    },
    {
      title: { en: "Tools", fr: "Outils" },
      type: "badges",
      items: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "GitLab" },
        { name: "GitHub Actions" },
        { name: "GitLab CI" },
      ],
    },
    {
      title: { en: "Languages", fr: "Langues" },
      type: "languages",
      items: [
        {
          name: { en: "English", fr: "Anglais" },
          level: { en: "B2", fr: "B2" },
        },
        { name: { en: "Arabic", fr: "Arabe" }, level: { en: "B2", fr: "B2" } },
        { name: { en: "Kabyle", fr: "Kabyle" }, level: { en: "A2", fr: "A2" } },
      ],
    },
  ],

  /* ==== EXPERIENCES ==== */
  experiences: [
    {
      id: "tilkal",
      company: { en: "Tilkal", fr: "Tilkal" },
      role: { en: "Fullstack Developer", fr: "Développeur Full Stack" },
      type: { en: "Apprenticeship (3WA)", fr: "Alternance (3WA)" },
      period: {
        en: "1/6/2025 – 2/28/2026",
        fr: "06/01/2025 – 28/02/2026",
      },
      description: {
        en: "Work-study program at 3W Academy (Full Stack Developer training), contributing to open-source tooling and internal product development.",
        fr: "Alternance dans le cadre de la formation 3WA (Full Stack Developer). Contribution à des outils open source et au développement produit interne.",
      },
      techs: [
        "React",
        "TypeScript",
        "NestJS",
        "GraphQL",
        "PostgreSQL",
        "Git",
        "GitLab",
        "GitLab CI",
      ],
      isHighlighted: false,
      details: {
        context: {
          en: "Apprenticeship at Tilkal, a tech company, as part of the Full Stack Developer training program at 3W Academy.",
          fr: "Alternance chez Tilkal dans le cadre de la formation Full Stack Developer à la 3W Academy.",
        },
        tasks: {
          en: [
            "Contributed to the development of an open-source JSON visualization tool (Leaf-it-to-me)",
            "Contributed to fake data generation for testing needs",
            "Refactored a product view to improve separation of concerns, user experience and simplification of the user journey",
            "Contributed to adding new automated test scenarios",
          ],
          fr: [
            "Contribution au développement d'un outil open source de visualisation JSON (Leaf-it-to-me)",
            "Contribution à la génération de données factices pour les besoins de tests",
            "Refactorisation d'une vue produit afin d'améliorer la séparation des responsabilités, l'expérience utilisateur et simplification du parcours utilisateur",
            "Contribution à l'ajout de nouveaux scénarios de test automatisés",
          ],
        },
        env: {
          en: "React / TypeScript / NestJS / GraphQL / PostgreSQL / Git / GitLab / GitLab CI",
          fr: "React / TypeScript / NestJS / GraphQL / PostgreSQL / Git / GitLab / GitLab CI",
        },
      },
    },
    {
      id: "simracers-x",
      company: { en: "Les Simracers X", fr: "Les Simracers X" },
      role: { en: "Fullstack Developer", fr: "Développeur Full Stack" },
      type: { en: "Freelance / Volunteer", fr: "Freelance / Bénévolat" },
      period: { en: "Since Dec 28, 2024", fr: "Depuis le 28 Décembre 2024" },
      description: {
        en: "Development of a community race event management platform and Discord bot to automate announcements and member interactions.",
        fr: "Développement d'une plateforme communautaire de gestion d'événements de course et d'un bot Discord pour automatiser les interactions.",
      },
      techs: [
        "React",
        "JavaScript",
        "Node.js",
        "Discord.js",
        "MySQL",
        "Git",
        "GitHub",
        "GitHub Actions",
        "Vercel",
      ],
      details: {
        context: {
          en: "Side project for a simracing community: building a full race event management platform (registrations, tracks, servers, users) and a Discord bot.",
          fr: "Projet personnel pour une communauté de simracing : développement d'une plateforme complète de gestion des événements de course et d'un bot Discord.",
        },
        tasks: {
          en: [
            "Developed a web platform for managing race events (registrations, tracks, servers, users, etc.)",
            "Created a Discord bot to automate announcements and member interactions",
            "Collaborated with organizers to define needs and improve internal management",
            "Hosting, maintenance and integration of community tools",
          ],
          fr: [
            "Développement d'un site web de gestion des événements de courses (inscriptions, circuits, serveurs, utilisateurs, etc.)",
            "Création d'un bot Discord pour automatiser les annonces et interactions avec les membres",
            "Collaboration avec les organisateurs pour définir les besoins et améliorer la gestion interne",
            "Hébergement, maintenance et intégration des outils communautaires",
          ],
        },
        env: {
          en: "React / TypeScript / Node.js / Discord.js / MySQL / Git / GitHub / GitHub Actions / Vercel",
          fr: "React / TypeScript / Node.js / Discord.js / MySQL / Git / GitHub / GitHub Actions / Vercel",
        },
      },
    },
    {
      id: "diligence",
      company: { en: "Diligence", fr: "Diligence" },
      role: { en: "Web Developer", fr: "Développeur Web" },
      type: {
        en: "Internship (1st year BTS)",
        fr: "Stage (1ère année de BTS)",
      },
      period: { en: "May 9 – Jun 23, 2023", fr: "09 Mai – 23 Juin 2023" },
      description: {
        en: "First-year BTS internship focused on WordPress CMS and Express.js back-office development.",
        fr: "Stage de 1ère année de BTS axé sur l'utilisation du CMS WordPress et le développement d'un backoffice avec ExpressJS.",
      },
      techs: ["WordPress", "Express.js", "Node.js"],
      details: {
        context: {
          en: "1st year BTS internship at Diligence.",
          fr: "Stage de 1ère année de BTS chez Diligence.",
        },
        tasks: {
          en: [
            "Used the WordPress CMS",
            "Created a back-office with Express.js",
          ],
          fr: [
            "Utilisation du CMS WordPress",
            "Création d'un backoffice avec ExpressJS",
          ],
        },
        env: {
          en: "WordPress / Node.js / Express.js",
          fr: "WordPress / Node.js / Express.js",
        },
      },
    },
    {
      id: "ccas",
      company: { en: "C.C.A.S", fr: "C.C.A.S" },
      role: { en: "Youth Camp Animator", fr: "Animateur" },
      type: { en: "Seasonal", fr: "Saisonnier" },
      period: {
        en: "Oct 17, 2021 – Oct 15, 2022",
        fr: "17/10/2021 – 15/10/2022",
      },
      description: {
        en: "Youth camp animator in Strasbourg and Annecy, supervising children aged 4 to 12.",
        fr: "Animation de colonies de vacances à Strasbourg et Annecy, encadrement d'enfants de 4 à 12 ans.",
      },
      techs: [],
      details: {
        context: {
          en: "Seasonal youth camp animator in Strasbourg and Annecy.",
          fr: "Animateur saisonnier en colonies de vacances à Strasbourg et Annecy.",
        },
        tasks: {
          en: ["Supervised and animated activities for children aged 4 to 12"],
          fr: ["Animation des colonies de vacances [Âge 4/12 ans]"],
        },
        env: {
          en: "Strasbourg / Annecy",
          fr: "Strasbourg / Annecy",
        },
      },
    },
  ],

  /* ==== EDUCATION ==== */
  education: [
    {
      school: {
        en: "3W Academy – Paris 75014",
        fr: "3W Academy – Paris 75014",
      },
      degree: {
        en: "Full Stack Developer Training [FSD]",
        fr: "Formation Full Stack Developer [FSD]",
      },
      period: "Janvier 2025 – Janvier 2026 [En cours...]",
    },
    {
      school: {
        en: "Lycée Jules Ferry – Versailles 78000",
        fr: "Lycée Jules Ferry – Versailles 78000",
      },
      degree: {
        en: "Higher Technician Certificate [BTS]",
        fr: "Brevet Technicien Supérieur [BTS]",
      },
      specialty: {
        en: "Digital Computer Systems and Networks [SNIR]",
        fr: "Système Numérique Informatique et Réseaux [SNIR]",
      },
      period: "Septembre 2022 – Juin 2024 [Obtenu]",
    },
    {
      school: {
        en: "Lycée Fresnel – Paris 75015",
        fr: "Lycée Fresnel – Paris 75015",
      },
      degree: { en: "Baccalauréat", fr: "Diplôme du Baccalauréat" },
      specialty: {
        en: "Science and Technology for Industry and Sustainable Development [STI2D]",
        fr: "Science Technologique de l'Industrie du Développement Durable [STI2D]",
      },
      period: "Septembre 2021 – Juillet 2022 [Obtenu]",
    },
  ],

  /* ==== HOBBIES ==== */
  hobbies: [
    {
      title: { en: "Simracing", fr: "Simracing" },
      details: [
        { en: "Le Mans Ultimate", fr: "Le Mans Ultimate" },
        { en: "Assetto Corsa Competizione", fr: "Assetto Corsa Competizione" },
        { en: "3 Years of experience", fr: "3 ans d'expérience" },
      ],
    },
    {
      title: { en: "Photography", fr: "Photographie" },
      details: [
        { en: "Street photography", fr: "Photographie de rue" },
        { en: "Portraits", fr: "Portraits" },
        { en: "Landscapes", fr: "Paysages" },
        { en: "7 Years of experience", fr: "7 ans d'expérience" },
      ],
    },
  ],

  /* ==== THEME ==== */
  theme: {
    preset: "forest",
  },

  /* ==== UI LABELS ==== */
  labels: {
    sections: {
      contact: { en: "CONTACT", fr: "CONTACT" },
      skills: { en: "SKILLS", fr: "COMPÉTENCES" },
      experience: {
        en: "PROFESSIONAL EXPERIENCE",
        fr: "EXPÉRIENCES PROFESSIONNELLES",
      },
      education: { en: "EDUCATION", fr: "FORMATIONS" },
      projects: { en: "PROJECTS", fr: "PROJETS" },
      hobbies: { en: "INTERESTS", fr: "CENTRES D'INTÉRÊT" },
    },
    experience: {
      mainTasks: { en: "Main tasks:", fr: "Tâches principales :" },
      moreTasks: { en: "more tasks...", fr: "autres tâches..." },
      training: { en: "Training:", fr: "Formations :" },
      techEnv: { en: "Tech environment:", fr: "Env. technique :" },
      technologies: { en: "Technologies", fr: "Technologies" },
    },
    actions: {
      clickHint: {
        en: "Click on experiences to see more details",
        fr: "Cliquez sur les expériences pour voir plus de détails",
      },
      switchTheme: { en: "Toggle dark mode", fr: "Changer le thème" },
      downloadPdf: { en: "Download PDF", fr: "Télécharger le PDF" },
    },
  },

  pdf: {
    label: { en: "Download PDF", fr: "Télécharger le PDF" },
    path: "/cv/fr/resume_chikhi.pdf",
  },
};
