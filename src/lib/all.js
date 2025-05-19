const projects = [
  {
    id: 1,
    title: "Adventures",
    description:
      "Un site web conçu pour une agence de voyage fictive, offrant des expériences uniques aux aventuriers du monde entier.",
    image: "/logo.png",
    link: "https://our-adventures.vercel.app/",
  },
  {
    id: 2,
    title: "Lilee",
    description:
      "Refonte non-officielle de la plateforme Lilee(live like everyone else)",
    image: "/logoLilee.jpg",
    link: "/https://lileedemotest.vercel.app/",
  },
  {
    id: 3,
    title: "Site portfolio de Kleernet Infini",
    description:
      "Ceci est le site web de Kleernet Infini, développement géré par Kenza Mahleb (Encore déploiement test)",
    image: "/logokI.png",
    link: "https://kleernetinfini-project.vercel.app/fr",
  },
];

const skills = [
  {
    name: "React",
    level: "Intermédiaire",
    description:
      "Bibliothèque JavaScript pour la création d'interfaces utilisateur dynamiques.",
    img: "/REACT.svg",
  },
  {
    name: "Next.js",
    level: "Intermédiaire",
    description:
      "Framework React pour le rendu côté serveur et les applications web modernes.",
    img: "/next.png",
  },
  {
    name: "TypeScript",
    level: "Débutante",
    description:
      "Superset de JavaScript qui ajoute un typage statique pour un développement robuste.",
    img: "/ts.png",
  },
  {
    name: "Node.js",
    level: "Intermédiaire",
    description:
      "Plateforme JavaScript côté serveur pour créer des applications scalables.",
    img: "/NODE.png",
  },
  {
    name: "Tailwind CSS",
    level: "Intermédiaire",
    description: "Framework CSS utilitaire pour un design rapide et flexible.",
    img: "/TAILWIND.png",
  },
  {
    name: "PERN",
    level: "Intermédiaire",
    description:
      "Stack de développement avec PostgreSQL, Express.js, React et Node.js.",
    img: "/JS.png",
  },
  {
    name: "Python (PyQT)",
    level: "Intermédiaire",
    description:
      "Langage polyvalent avec Python utilisant le framework Qt pour le développement d'interfaces utilisateur.",
    img: "/pyqt.jpeg",
  },
  {
    name: "C#",
    level: "Intermédiaire",
    description:
      "Langage orienté objet utilisé pour les applications Windows et les jeux.",
    img: "/c.png",
  },
  {
    name: "PHP",
    level: "Intermédiaire",
    description:
      "Langage de script côté serveur pour le développement web dynamique.",
    img: "/php.png",
  },
];

const etapesEducatives = [
  {
    titre: "Baccalauréat Scientifique, série C",
    description: "Mon diplôme de fin d'études scolaires avec la mention Bien.",
    annees: "2020 - 2021",
  },
  {
    titre: "Première année de licence en Math-Info",
    description:
      "J'ai passé une année à étudier les mathématiques appliquées à l'informatique à l'université de Barikadimy, à Tamatave",
    annees: "2021 - 2022",
  },
  {
    titre: "Première année de licence professionnelle à l'ENI",
    description:
      "Après avoir passer le concours d'entrée, j'ai pu intégrer les rangs des permières années à l'Ecole Nation d'Informatique à Tuléar, en suivant la mention IG.",
    annees: "2022 - 2023",
  },
  {
    titre: "Deuxième année de licence professionnelle à l'ENI",
    description:
      "En vue de poursuivre mes études en informatique, je continue mon aventure enrichissante avec l'ENI.",
    annees: "2023 - 2024",
  },
  {
    titre: "Troisième année de licence professionnelle à l'ENI",
    description:
      "Dans le but d'obtenir ma licence professionnelle en informatique.",
    annees: "Présent",
  },
];

const sections = [
  { id: "accueil", name: "Accueil" },
  { id: "educations", name: "Education" },
  { id: "projets", name: "Projets" },
  { id: "testimonials", name: "Témoignages" },
  { id: "contact", name: "Contact" },
];

const testimonials = [
  {
    id: 1,
    name: "Garoui Jugurtha",
    designation: "Responsable de Kleer Infini",
    content:
      "Collaborer avec Stéphanie a été un réel plaisir et une véritable valeur ajoutée pour notre équipe. Elle a assuré à elle seule la construction complète du site web de Kleer Infini, maîtrisant aussi bien les technologies frontend que backend. Elle s'est illustrée par une capacité exceptionnelle à comprendre les besoins, proposer des solutions efficaces, et livrer un travail propre, fiable et bien documenté.",
    image: "/logokI.png",
  },
  {
    id: 2,
    name: "Garoui Jugurtha",
    designation: "Responsable de Kleer Infini",
    content:
      "Stéphanie est une développeuse talentueuse, méticuleuse et professionnelle, capable de mener un projet complexe de bout en bout. Je la recommande les yeux fermés pour tout poste ou mission dans le domaine du développement web.",
    image: "/logokI.png",
  },
];

export { projects, skills, etapesEducatives, sections, testimonials };
