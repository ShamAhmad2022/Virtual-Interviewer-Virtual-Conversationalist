import Link from "next/link";
import React from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

function VirConIn() {
  return (
    <section className="w-[100%] h-[75vh] flex flex-col lg:flex-row mb-20">
      <div className="relative h-[100%] w-[100%] lg:w-[50%] flex justify-center items-center border-r-2 border-blue-200 group overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `url("https://images.pexels.com/photos/3778795/pexels-photo-3778795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
          }}
        ></div>
        <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#63441e]/80"></div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href={"/VirtualConversationalist"}
            className="z-10 text-white text-[1.3rem] sm:text-[2rem] border-4 border-white p-4 transition-all duration-300 hover:-translate-x-3 hover:bg-white hover:text-[#63441e]/80 flex gap-5 items-center"
          >
            <FaArrowLeftLong />
            Virtual conversationalist
          </Link>
        </motion.div>
      </div>

      <div className="relative h-[100%] w-[100%] lg:w-[50%] flex justify-center items-center border-r-2 border-blue-200 group overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `url("https://media.istockphoto.com/id/1498837176/photo/image-of-employer-or-recruiter-holding-reading-a-resume-during-about-colloquy-his-profile-of.jpg?s=612x612&w=0&k=20&c=pVRaohbqUmOHi2vMWS5tdVbSIrB8DKLq5DdmAyKGPp4=")`,
          }}
        ></div>
        <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#1e5563]/80"></div>

        <motion.div
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Link
            href={"/VirtualIntreviewer"}
            className="z-10 text-white text-[1.3rem] sm:text-[2rem] border-4 border-white p-4 transition-all duration-300 hover:translate-x-3 hover:bg-white hover:text-[#1e5563]/80 flex gap-5 items-center"
          >
            Virtual Intreviewer <FaArrowRightLong />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default VirConIn;
