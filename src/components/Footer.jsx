"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setIsErrorModalOpen(true);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccessModalOpen(true);
        setEmail("");
      } else if (response.status === 409) {
        setIsInfoModalOpen(true);
        setEmail("");
      } else {
        setIsErrorModalOpen(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const dataIcons = [
    {
      url: "https://web.facebook.com/",
      img: "/facebook.svg",
      name: "Facebook",
    },
    {
      url: "https://www.linkedin.com/",
      img: "/linkedin.svg",
      name: "LinkedIn",
    },
    {
      url: "+261 00 00 000 000",
      img: "/whatsapp (1).svg",
      name: "WhatsApp",
    },
    {
      name: "téléphone",
      url: "+261 00 00 000 00",
      img: "/phone.svg",
    },
    {
      name: "email",
      url: "stephaniepageot42@gmail.com",
      img: "/email.svg",
    },
  ];

  return (
    <footer className=" px-4 sm:px-6 lg:px-8 mt-5 ">
      <div className=" text-center text-gray-600 mb-10 mt-20">
        &copy; Copyright {currentYear} | Conçu par{" "}
        <Link href="/" className="text-[#ac4db3]">
          Stéphanie MAMINIAINA
        </Link>{" "}
      </div>
    </footer>
  );
}
