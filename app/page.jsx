"use client";

import AboutCreator from "@/components/AboutCreator";
import AboutVirConIn from "@/components/AboutVirConIn";
import ShowNote from "@/components/Toast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Top from "@/components/Top";
import VirConIn from "@/components/VirConIn";

export default function Home() {
  return (
    <>
      <Top />
      <Header />
      <AboutVirConIn />
      <VirConIn />
      <AboutCreator />
      <Footer />
      <ShowNote />
    </>
  );
}
