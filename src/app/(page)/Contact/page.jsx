"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SiWhatsapp } from "react-icons/si";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  Mail,
  MapPin,
  Printer,
} from "lucide-react";

export default function Home() {
  const [showWhiteCard, setShowWhiteCard] = useState(false);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 relative mb-8 lg:mb-0">
          <AnimatePresence initial={false}>
            {!showWhiteCard ? (
              <motion.div
                key="redCard"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-transparent rounded-lg p-4 sm:p-6 md:p-10 text-white flex items-center justify-center mt-10 sm:mt-16 md:mt-20"
              >
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border border-gray-100">
                  <h2 className="text-2xl text-center sm:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent tracking-wide">
                    Contact Us
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
                        <p className="font-medium">Madagascar, Tuléar 601</p>
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
                className="w-full bg-white rounded-lg shadow-lg"
              >
                <div className="p-4 sm:p-6 md:p-10">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent tracking-wide">
                    Prenons contact
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 font-light leading-relaxed">
                    Je serais ravie de discuter avec vous. À très bientôt !
                  </p>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="pt-4 sm:pt-6 md:pt-8">
                      <div className="grid w-full items-center gap-4">
                        <div className="grid w-full items-center gap-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="nom"
                              className="text-right text-[#425466] font-medium text-sm sm:text-base"
                            >
                              Votre nom
                            </label>
                            <Input
                              id="nom"
                              placeholder="MAMINIAINA"
                              value={nom}
                              required
                              onChange={(e) => setNom(e.target.value)}
                              className="col-span-3 items-start w-full bg-[#edf2f7] text-sm sm:text-base text-[#27272E] font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="text-right text-[#425466] font-medium text-sm sm:text-base"
                            >
                              Votre adresse email
                            </label>
                            <Input
                              id="email"
                              placeholder="stephaniepageot@gmail.com"
                              value={email}
                              required
                              onChange={(e) => setEmail(e.target.value)}
                              className="col-span-3 items-start w-full bg-[#edf2f7] text-sm sm:text-base text-[#27272E] font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="num"
                              className="text-right text-[#425466] font-medium text-sm sm:text-base"
                            >
                              Votre numéro de téléphone
                            </label>
                            <PhoneInput
                              country={"mg"}
                              value={phone}
                              required
                              onChange={setPhone}
                              placeholder="Entrez votre numéro"
                              inputStyle={{ width: "100%", height: "40px" }}
                              buttonClass="custom-flag-style"
                              inputClass="col-span-3 items-start w-full bg-[#edf2f7] text-sm sm:text-base text-[#27272E] font-medium"
                            />
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label
                              htmlFor="objet"
                              className="text-[#425466] font-medium text-sm sm:text-base"
                            >
                              L&apos;objet du message
                            </label>
                            <Input
                              id="objet"
                              placeholder="L'objet du message"
                              value={objet}
                              required
                              onChange={(e) => setObjet(e.target.value)}
                              className="col-span-3 items-start w-full bg-[#edf2f7] text-sm sm:text-base text-[#27272E] font-medium"
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="message"
                              className="text-right text-[#425466] font-medium text-sm sm:text-base"
                            >
                              Votre message
                            </label>
                            <textarea
                              id="message"
                              value={message}
                              required
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Écrivez votre message ici ..."
                              className="col-span-3 w-full h-32 sm:h-48 md:h-64 bg-[#edf2f7] text-sm sm:text-base text-[#27272E] font-medium p-2 rounded-md"
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
                        {loading ? "Envoi en cours..." : "Envoyer le message"}
                      </Button>
                      <Button
                        onClick={() => setShowWhiteCard(false)}
                        type="button"
                        variant="outline"
                        className="w-full py-4 sm:py-6 text-pink-500 border-pink-500 hover:bg-pink-50 hover:text-pink-500 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
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
  );
}
