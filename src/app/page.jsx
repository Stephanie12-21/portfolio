"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SiWhatsapp } from "react-icons/si";
import {
  BrainCircuit,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  FacebookIcon,
  GithubIcon,
  GraduationCap,
  LinkedinIcon,
  Mail,
  MapPin,
  MegaphoneIcon,
  Quote,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { SuccessModal } from "./(modal)/contact/SuccessModal";
import { ErrorModal } from "./(modal)/contact/ErrorModal";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  etapesEducatives,
  projects,
  sections,
  skills,
  testimonials,
} from "@/lib/all";

function CardWrapper({ etape, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Card className="bg-white/80  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{etape.titre}</CardTitle>
            <Badge variant="secondary" className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {etape.annees}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">
            {etape.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectCard({ project, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full flex flex-col bg-white/80  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Link href={project.link} passHref>
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
                  Voir le projet
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const firstRow = skills?.slice(0, skills?.length / 1);

const ReviewCard = ({ img, name, level, description }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 bg-white"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-base font-bold">{name}</figcaption>
          <p className="text-sm font-medium">{level}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-base">{description}</blockquote>
    </figure>
  );
};

export default function Home() {
  const router = useRouter();
  const [visibleCards, setVisibleCards] = useState(0);
  const [showWhiteCard, setShowWhiteCard] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibleSkills, setVisibleSkills] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(0);
  const [error, setError] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleseeProject = () => {
    router.push("https://github.com/Stephanie12-21");
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const skillsInterval = setInterval(() => {
        setVisibleSkills((prev) => (prev < skills?.length ? prev + 1 : prev));
      }, 300);

      const projectsInterval = setInterval(() => {
        setVisibleProjects((prev) =>
          prev < projects?.length ? prev + 1 : prev
        );
      }, 500);

      return () => {
        clearInterval(skillsInterval);
        clearInterval(projectsInterval);
      };
    }
  }, [inView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards((prev) =>
        prev < etapesEducatives?.length ? prev + 1 : prev
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      nom,
      email,
      phone: `+${phone}`,
      objet,
      message,
    };

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de l'envoi du message."
        );
      }
      setIsSuccessModalOpen(true);
      handleResetForm();
    } catch (error) {
      setIsErrorModalOpen(true);
      setError("Une erreur s'est produite lors de l'envoi du message.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setNom("");
    setEmail("");
    setPhone("");
    setObjet("");
    setMessage("");
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-blue-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full" />
            <span className="font-semibold text-lg">Stéphanie MAMINIAINA</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-base text-gray-600">
            {sections?.map((section) => (
              <button
                key={section.id}
                onClick={() => handleScroll(section.id)}
                className="capitalize text-gray-600 hover:text-pink-500"
              >
                {section.name}
              </button>
            ))}
          </div>
          <Button
            onClick={() => handleScroll(contact.id)}
            className=" bg-gradient-to-r from-pink-500 to-purple-400 hover:from-pink-600 hover:to-purple-500 text-white text-base sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            Me recruter
          </Button>
        </header>

        <main className="space-y-32">
          <section
            id="accueil"
            className="py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto">
              <div className="relative grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative z-10 text-center md:text-left">
                  <div className="mb-8">
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      Bonjour, bienvenue sur mon site portfolio. Je suis
                    </p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                      Développeuse <br /> web <br />
                      fullstack .
                    </h1>
                    <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-md mx-auto md:mx-0">
                      Vous avez les idées et moi les compétences.{" "}
                      <br className="hidden sm:inline" /> Pourquoi ne pas
                      collaborer ensemble?
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-5">
                    <Button
                      onClick={() => handleScroll(contact.id)}
                      className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-400 hover:from-pink-600 hover:to-purple-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    >
                      C&apos;est parti, discutons-en.
                    </Button>
                    {/* <Button
                      onClick={() =>
                        router.push(
                          "https://drive.google.com/file/d/1cnkBEkjk0hseAu6oQDvP6UrizgmDTUqG/view?usp=sharing"
                        )
                      }
                      className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-400 hover:from-pink-600 hover:to-purple-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    >
                      Voir mon CV
                    </Button> */}
                  </div>
                </div>

                <div className="relative mt-10 md:mt-0">
                  <div className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                    <div className="absolute inset-0 bg-pink-500/20 rounded-[3rem] transform rotate-45" />

                    <div className="relative z-10 overflow-hidden rounded-full aspect-square">
                      <Image
                        src="/pp.png"
                        alt="Digital Creator"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-xl transform rotate-45 translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 bg-purple-500 rounded-xl transform rotate-45 translate-x-1/3 translate-y-1/3" />
                    <div className="absolute top-1/2 left-0 w-4 h-4 sm:w-6 sm:h-6 bg-pink-500 rounded-xl transform rotate-45 -translate-x-1/2" />
                  </div>

                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-[radial-gradient(circle,_transparent_20%,_#e5e5f7_20%,_#e5e5f7_80%,_transparent_80%,_transparent),radial-gradient(circle,_transparent_20%,_#e5e5f7_20%,_#e5e5f7_80%,_transparent_80%,_transparent)_25px_25px] bg-[length:50px_50px]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="educations" className="relative  overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-pink-500" />
                <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  Mon Parcours Éducatif
                </h2>
              </motion.div>

              <AnimatePresence>
                {etapesEducatives
                  ?.slice(0, visibleCards)
                  .map((etape, index) => (
                    <motion.div
                      key={etape.titre}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="  mb-8"
                    >
                      <CardWrapper etape={etape} index={index} />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </section>

          <section id="projets" className="relative  overflow-hidden">
            <div
              ref={ref}
              className="relative max-w-7xl mx-auto px-4 sm:px-4 lg:px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <BrainCircuit className="w-16 h-16 mx-auto mb-4 text-pink-500" />
                <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                  Mes compétences et réalisations
                </h2>
              </motion.div>

              <Marquee pauseOnHover className="[--duration:50s]">
                {firstRow.map((skills) => (
                  <ReviewCard key={skills?.name} {...skills} />
                ))}
              </Marquee>

              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects?.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isVisible={index < visibleProjects}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-20">
                <Button
                  onClick={handleseeProject}
                  className="w-full lg:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-base"
                >
                  Voir plus de projects
                </Button>
              </div>
            </div>
          </section>

          <section
            id="testimonials"
            className="w-full max-w-6xl mx-auto relative  overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <MegaphoneIcon className="w-16 h-16 mx-auto mb-4 text-pink-500" />
              <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                Ce qu&apos;on dit sur moi
              </h2>
            </motion.div>

            <div className="flex flex-col items-center justify-center gap-10 py-8 w-full max-w-4xl mx-auto">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full overflow-hidden border border-gray-100"
                >
                  {/* Gradient header with name */}
                  <div className="w-full px-8 py-4 left-0 top-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm opacity-90">
                          {testimonial.designation}
                        </p>
                      </div>

                      {/* Profile image */}
                      <div className="relative w-[70px] h-[70px] rounded-full p-[3px] bg-white bg-opacity-30 backdrop-blur-sm">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            height={70}
                            width={70}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-8 pt-6">
                    <div className="flex gap-4">
                      {/* Vertical accent line */}
                      <div className="min-h-full w-1 rounded-full bg-gradient-to-b from-pink-500 to-purple-600 opacity-70"></div>

                      <div className="flex-1 relative">
                        {/* Quote icon */}
                        <Quote className="absolute -top-1 -left-2 text-gray-200 w-8 h-8 opacity-50" />

                        {/* Testimonial text */}
                        <p className="text-gray-700 relative z-10 pl-5 italic">
                          &quot;{testimonial.content}&quot;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom decoration */}
                  <div className="h-2 w-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
                </div>
              ))}
            </div>
          </section>

          <section id="contact" className="relative  overflow-hidden">
            <div className="relative flex justify-center items-center min-h-screen">
              <div className="w-full max-w-6xl flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 relative  lg:mb-0">
                  <AnimatePresence initial={false}>
                    {!showWhiteCard ? (
                      <motion.div
                        key="redCard"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-white/80  rounded-lg p-4 sm:p-6 md:p-10 text-gray-800 flex items-center justify-center mt-10 sm:mt-16 md:mt-20 shadow-lg"
                      >
                        <div className="w-full max-w-md p-4">
                          <h2 className="text-2xl text-center sm:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent tracking-wide">
                            Prenons contact
                          </h2>
                          <div className="space-y-6 mt-10 text-base">
                            <div className="flex items-start gap-4">
                              <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                                <MapPin
                                  className="mt-1 w-5 h-5 stroke-pink-500"
                                  strokeWidth={2}
                                />
                              </div>
                              <div className="text-gray-600">
                                <p className="font-medium">
                                  Madagascar, Tuléar 601
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                                <Mail
                                  className="w-5 h-5 stroke-pink-500"
                                  strokeWidth={2}
                                />
                              </div>
                              <a
                                href="mailto:stephaniepageot42@gmail.com"
                                className="text-gray-600 "
                              >
                                stephaniepageot42@gmail.com
                              </a>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                                <SiWhatsapp className="w-5 h-5 text-pink-500" />
                              </div>
                              <a
                                href="https://wa.me/+261381182627"
                                className="text-gray-600"
                              >
                                +261 38 11 826 27
                              </a>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                                <FacebookIcon
                                  className="w-5 h-5 stroke-pink-500"
                                  strokeWidth={2}
                                />
                              </div>
                              <a
                                href="https://web.facebook.com/stephanie.maminiaina.12"
                                className="text-gray-600"
                              >
                                Stéphanie Maminiaina
                              </a>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                                <LinkedinIcon
                                  className="w-5 h-5 stroke-pink-500"
                                  strokeWidth={2}
                                />
                              </div>
                              <a
                                href="https://www.linkedin.com/in/st%C3%A9phanie-maminiaina-262066303/"
                                className="text-gray-600"
                              >
                                Stéphanie MAMINIAINA
                              </a>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
                                <GithubIcon
                                  className="w-5 h-5 stroke-pink-500"
                                  strokeWidth={2}
                                />
                              </div>
                              <a
                                href="https://github.com/Stephanie12-21"
                                className="text-gray-600"
                              >
                                Stéphanie Maminiaina
                              </a>
                            </div>
                            <Button
                              onClick={() => setShowWhiteCard(true)}
                              className="w-full py-4 sm:py-6 bg-gradient-to-r from-pink-500 to-purple-400 hover:from-pink-600 hover:to-purple-500 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                            >
                              Me contacter
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="whiteCard"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className="w-full bg-white/80 rounded-lg shadow-lg"
                      >
                        <div className="p-4 sm:p-6 md:p-10">
                          <h2 className="text-2xl sm:text-3xl text-center  font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent tracking-wide">
                            Prenons contact
                          </h2>
                          <p className="text-base text-center sm:text-lg text-gray-600 mb-6 sm:mb-8 font-light leading-relaxed">
                            Je serais ravie de discuter avec vous. À très
                            bientôt !
                          </p>
                          <form onSubmit={handleSubmit}>
                            <CardContent className="pt-0 sm:pt-6 md:pt-4">
                              <div className="grid w-full items-center gap-5">
                                <div className="grid w-full items-center gap-3">
                                  <div className="space-y-8">
                                    <Input
                                      id="nom"
                                      placeholder="Votre nom complet"
                                      value={nom}
                                      required
                                      onChange={(e) => setNom(e.target.value)}
                                      className="col-span-3 items-start w-full bg-[#edf2f7] text-base sm:text-base text-[#27272E] font-medium"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Input
                                      id="email"
                                      placeholder="votreemail@gmail.com"
                                      value={email}
                                      required
                                      onChange={(e) => setEmail(e.target.value)}
                                      className="col-span-3 items-start w-full bg-[#edf2f7] text-base sm:text-base text-[#27272E] font-medium"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <PhoneInput
                                      country={"mg"}
                                      value={phone}
                                      required
                                      onChange={setPhone}
                                      placeholder="Entrez votre numéro"
                                      inputStyle={{
                                        width: "100%",
                                        height: "48px",
                                      }}
                                      buttonClass="custom-flag-style"
                                      inputClass="col-span-3 items-start w-full bg-[#edf2f7] text-base sm:text-base text-[#27272E] font-medium"
                                    />
                                  </div>
                                  <div className="flex flex-col space-y-2">
                                    <Input
                                      id="objet"
                                      placeholder="L'objet du message"
                                      value={objet}
                                      required
                                      onChange={(e) => setObjet(e.target.value)}
                                      className="col-span-3 items-start w-full bg-[#edf2f7] text-base sm:text-base text-[#27272E] font-medium"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <textarea
                                      id="message"
                                      value={message}
                                      required
                                      onChange={(e) =>
                                        setMessage(e.target.value)
                                      }
                                      placeholder="Écrivez votre message ici ..."
                                      className="col-span-3 w-full h-32 sm:h-48 md:h-64 bg-[#edf2f7] text-base sm:text-base text-[#27272E] font-medium p-2 rounded-md"
                                    />
                                  </div>
                                </div>
                              </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4 p-4 sm:p-6">
                              <Button
                                className="w-full py-4 sm:py-6 bg-gradient-to-r from-pink-500 to-purple-400 hover:from-pink-600 hover:to-purple-500 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                                type="submit"
                                disabled={loading}
                              >
                                {loading
                                  ? "Envoi en cours..."
                                  : "Envoyer le message"}
                              </Button>
                              <Button
                                onClick={() => setShowWhiteCard(false)}
                                type="button"
                                variant="outline"
                                className="w-full py-4 sm:py-6 text-pink-500 hover:border-pink-500 hover:bg-pink-50 hover:text-pink-500 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                              >
                                Annuler
                              </Button>
                            </CardFooter>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-10 hidden md:block">
                  <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-2xl h-[300px] sm:h-[400px] md:h-[600px] lg:h-[900px] flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src="/image.svg"
                      alt="image"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className=" text-center text-gray-600 py-8 ">
            &copy; Copyright {currentYear} | Conçu par{" "}
            <Link
              href="https://stephanie-maminiaina.vercel.app/"
              a
              className="text-[#dd5bb9] hover:text-[#dd5bb9] hover:underline"
            >
              Stéphanie MAMINIAINA
            </Link>{" "}
          </div>
        </main>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
}
