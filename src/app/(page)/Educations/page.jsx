"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const etapesEducatives = [
  {
    titre: "École primaire",
    description: "Mes premiers pas dans l'éducation",
    annees: "2000 - 2005",
    points: [
      "Apprentissage de la lecture et de l'écriture",
      "Découverte des mathématiques",
      "Premières amitiés durables",
    ],
  },
  {
    titre: "Collège",
    description: "Développement des connaissances fondamentales",
    annees: "2005 - 2009",
    points: [
      "Approfondissement en sciences",
      "Début de l'apprentissage des langues étrangères",
      "Participation à des clubs scolaires",
    ],
  },
  {
    titre: "Lycée",
    description: "Spécialisation et préparation aux études supérieures",
    annees: "2009 - 2012",
    points: [
      "Choix de la filière scientifique",
      "Participation à des olympiades de mathématiques",
      "Obtention du baccalauréat avec mention",
    ],
  },
  {
    titre: "Études supérieures",
    description: "Formation approfondie et spécialisation",
    annees: "2012 - 2017",
    points: [
      "Diplôme d'ingénieur en informatique",
      "Stage de fin d'études dans une start-up",
      "Projet de fin d'études en intelligence artificielle",
    ],
  },
  {
    titre: "Formation continue",
    description: "Perfectionnement professionnel",
    annees: "2017 - Présent",
    points: [
      "Certification en gestion de projet agile",
      "Participation à des conférences tech",
      "Apprentissage continu en développement web",
    ],
  },
];

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <h1 className="text-3xl font-bold text-center mb-8">
        Mon Parcours Éducatif
      </h1>
      <div className="space-y-8">
        {etapesEducatives.map((etape, index) => (
          <motion.div
            key={etape.titre}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card
              className={`w-full md:w-2/3 ${
                index % 2 === 0 ? "md:ml-0" : "md:ml-auto"
              }`}
            >
              <CardHeader>
                <CardTitle>{etape.titre}</CardTitle>
                <CardDescription>{etape.annees}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{etape.description}</p>
                <ul className="list-disc pl-5">
                  {etape.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
