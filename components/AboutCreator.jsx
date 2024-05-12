import React from "react";
import { IoGlobeSharp } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

function AboutCreator() {
  return (
    <motion.section
      className="w-[100%] flex justify-center items-center text-center text-gray-800 mb-16 sm:mb-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="w-[90%] sm:w-[80%] lg:w-[60%] flex flex-col justify-center items-center gap-6">
        <h3 className="text-[2rem] sm:text-[2.5rem] font-bold">
          About the creator
        </h3>
        <p className="text-[1.5rem]">
          I{"'"}m a <span className="font-semibold">Web developer</span> with
          almost 2 years of experience. I build functional, user friendly and
          responsive websites and web applications.
        </p>
        <div className="flex items-center gap-7 sm:gap-10 text-[3.5rem] sm:text-[5rem] mt-5">
          <Link
            href={"https://sham-aj-portfolio.vercel.app/"}
            className="transition-all hover:-translate-y-2 hover:scale-110 hover:text-gray-700"
            target="_blank"
          >
            <IoGlobeSharp />
          </Link>
          <Link
            href={"https://github.com/ShamAhmad2022"}
            className="transition-all hover:-translate-y-2 hover:scale-110 hover:text-gray-700"
            target="_blank"
          >
            <IoLogoGithub />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/sham-al-jalam"}
            className="transition-all hover:-translate-y-2 hover:scale-110 hover:text-gray-700"
            target="_blank"
          >
            <FaLinkedin />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutCreator;
