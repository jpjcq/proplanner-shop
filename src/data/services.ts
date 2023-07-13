import { Services } from "../types/services";

const services: Services = {
  services: [
    {
      _id: "P1",
      title: "Pose en gel",
      description:
        "Toutes les prestations comprennent une manucure pour une pose complète, renforcement, comblage ou semi-permanent. Pensez à ajouter une prestation à la suite si vous souhaitez des décos nail art etc.. Dépose obligatoire sur tout type d'ongle faits par une autre prothésiste ongulaire.",
      secondaryServices: [
        {
          _id: "P1.1",
          short: "Pose naturelle",
          title: "Pose sans rallongement",
          description:
            "Pose sans rallongement. Couleur incluse, semi-permanent ou gel de couleurs.",
          duration: 80,
          price: 48,
        },
        {
          _id: "P1.2",
          short: "Pose complète",
          title: "Pose complète (avec rallongement chablon)",
          description:
            "Pose complète avec ralongement chablon. Couleur incluse, semi-permanent ou gel de couleurs.",
          duration: 110,
          price: 55,
        },
        {
          _id: "P1.3",
          short: "Pose et french",
          title: "Pose complète avec french",
          description:
            "Pose complète avec ralongement chablon et french manucure.",
          duration: 120,
          price: 61,
        },
        {
          _id: "P1.4",
          short: "Pose et babyboomer",
          title: "Pose complète avec babyboomer",
          description: "Pose complète avec ralongement chablon et babyboomer.",
          duration: 120,
          price: 63,
        },
        {
          _id: "P1.5",
          short: "Dépose et pose",
          title: "Dépose et pose complète (avec rallongement chablon)",
          description:
            "Dépose et pose complète avec ralongement chablon. Couleur incluse, semi-permanent ou gel de couleurs.",
          duration: 130,
          price: 65,
        },
      ],
    },
    {
      _id: "P2",
      title: "Comblage gel",
      description:
        "Toutes les prestations comprennent une manucure pour une pose complète, renforcement, comblage ou semi-permanent. Pensez à ajouter une prestation à la suite si vous souhaitez des décos nail art etc.. Dépose obligatoire sur tout type d'ongle faits par une autre prothésiste ongulaire.",
      secondaryServices: [
        {
          _id: "P2.1",
          title: "Comblage gel (3 à 4 semaines)",
          short: "Comblage gel",
          description:
            "Comblage gel, pour une pose réalisée par mes soins, datant d'il y a 3 à 4 semaines. Couleur incluse, semi-permanent ou gel de couleur.",
          duration: 90,
          price: 40,
        },
        {
          _id: "P2.2",
          title: "Comblage gel tardif (+ de 4 semaines)",
          short: "Comblage gel tardif",
          description:
            "Comblage gel, pour une pose réalisée par mes soins, datant d'il y a plus de 4 semaines. Couleur incluse, semi-permanent ou gel de couleur.",
          duration: 90,
          price: 45,
        },
        {
          _id: "P2.3",
          title: "Comblage gel avec french",
          short: "Comblage gel et french",
          description:
            "Comblage gel, pour une pose réalisée par mes soins, datant d'il y a plus de 4 semaines, avec french manucure.",
          duration: 100,
          price: 46,
        },
        {
          _id: "P2.4",
          title: "Comblage gel avec babyboomer",
          short: "Comblage gel et babyboomer",
          description:
            "Comblage gel, pour une pose réalisée par mes soins, datant d'il y a plus de 4 semaines, avec babyboomer.",
          duration: 100,
          price: 48,
        },
      ],
    },
    {
      _id: "P3",
      title: "Pose vernis semi-permanent",
      description:
        "Toutes les prestations comprennent une manucure pour une pose complète, renforcement, comblage ou semi-permanent. Pensez à ajouter une prestation à la suite si vous souhaitez des décos nail art etc.. Dépose obligatoire sur tout type d'ongle faits par une autre prothésiste ongulaire.",
      secondaryServices: [
        {
          _id: "P3.1",
          title: "Pose semi-permanent renforcé",
          short: "Pose semi",
          description: "Pose vernis semi-permanent renforcé.",
          duration: 60,
          price: 35,
        },
        {
          _id: "P3.2",
          title: "Dépose et pose semi-permanent renforcé",
          short: "Dépose et pose semi",
          description: "Dépose et pose vernis semi-permanent renforcé.",
          duration: 60,
          price: 40,
        },
        {
          _id: "P3.3",
          title: "Pose semi-permanent renforcé avec french",
          short: "Pose semi et french",
          description:
            "Pose vernis semi-permanent renforcé avec french manucure.",
          duration: 60,
          price: 41,
        },
        {
          _id: "P3.4",
          title: "Dépose semi-permanent renforcé",
          short: "Dépose semi",
          description: "Dépose vernis semi-permanent renforcé uniquement.",
          duration: 30,
          price: 15,
        },
      ],
    },
    {
      _id: "P4",
      title: "Décoration et nail art",
      description: "Le price indiqué est pour 1 ongle.",
      secondaryServices: [
        {
          _id: "P4.1",
          title: "Babyboomer/Colors/Glitters",
          short: "Babyboomer/Glitters",
          description: "Pose de Babyboomer/Colors/Glitters",
          duration: 1,
          price: 1,
        },
        {
          _id: "P4.2",
          title: "French classique ou colorée",
          short: "French manucure",
          description: "Pose d'une french classique ou colorée",
          duration: 1,
          price: 1,
        },
        {
          _id: "P4.3",
          title: "Incrustations (paillettes, feuilles d'or etc..)",
          short: "Incrustations",
          description:
            "Pose d'incrustations de type paillettes, feuilles d'or etc..",
          duration: 1,
          price: 1,
        },
        {
          _id: "P4.4",
          title: "Pigments (effet sirène, chrome, holographie etc..)",
          short: "Pigments",
          description:
            "Pose de pigments de type effet sirène, chrome, holographie etc..",
          duration: 1,
          price: 1,
        },
        {
          _id: "P4.5",
          title: "Nail art simple (effet marbre, pull-over etc..)",
          short: "Nail art simple",
          description: "Pose de nail art de type effet marbre, pull-over etc..",
          duration: 2,
          price: 2,
        },
        {
          _id: "P4.6",
          title: "Nail art technique sur devis",
          short: "Nail art technique",
          description:
            "Cette prestation ne peut pas être réservée en ligne, merci de me contacter au 06.21.76.99.67",
          duration: 1,
          price: 1,
        },
        {
          _id: "P4.7",
          title: "Nail art 10 doigts sur devis",
          short: "Nail art 10 doigts",
          description:
            "Cette prestation ne peut pas être réservée en ligne, merci de me contacter au 06.21.76.99.67",
          duration: 1,
          price: 1,
        },
      ],
    },
  ],
};

export default services;
