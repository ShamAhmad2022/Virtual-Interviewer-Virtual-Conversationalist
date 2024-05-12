"use client";

import React, { useEffect } from "react";
import { availablePositions } from "@/lib/data/intreviews";
import { FaRegLightbulb } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from "next/link";
import {
  frontendIntreview,
  backendIntreview,
  fullstackIntreview,
} from "@/lib/data/intreviews";

function FirstPage({ setGoNext, setPosition, setArray, position }) {
  useEffect(() => {
    switch (position) {
      case "Frontend Developer":
        setArray(frontendIntreview);
        break;
      case "Backend Developer":
        setArray(backendIntreview);
        break;
      case "Fullstack Developer":
        setArray(fullstackIntreview);
        break;
    }
  }, [position]);

  return (
    <motion.section
      className="flex justify-center items-center w-[100%] h-[100vh] text-[#1e4856]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative bg-[#ecf8fb] border border-[#A4DBEC] py-20 sm:py-10 sm:p-5 min-[1919px]:py-32 rounded-lg w-[90%] sm:w-[75%] lg:w-[40%] text-center text-[1.2rem]">
        <Link
          href={"/"}
          className="opacity-70 text-[3rem] absolute -translate-x-[50%] -translate-y-[50%] top-[5%] left-[9%] block sm:hidden"
        >
          <IoArrowBackCircleOutline />
        </Link>
        <h3 className="text-[3rem] leading-none">Virtual Interviewer</h3>

        <div className="flex flex-col w-[90%] sm:w-[60%] p-10 m-auto">
          <label>Select position:</label>
          <select
            //py-3 px-5 || h-[50px]
            className="bg-white border border-black/20 rounded-lg h-[50px] cursor-pointer outline-none text-center"
            defaultValue={availablePositions[0]}
            onChange={(e) => setPosition(e.target.value)}
          >
            {availablePositions.map((sentence, index) => (
              <option key={index} value={sentence}>
                {sentence}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[80%] sm:w-[60%] m-auto border border-[#1e4856]/50 rounded-lg px-5 pb-5">
          <h4
            className="-mt-5 text-[1.6rem] font-semibold"
            style={{
              textShadow:
                "-1px -1px 0 #ecf8fb, 1px -1px 0 #ecf8fb, -1px 1px 0 #ecf8fb, 1px 1px 0 #ecf8fb",
            }}
          >
            Tips:{" "}
          </h4>
          <div className="text-left">
            <p className="flex items-center gap-1 font-medium">
              <FaRegLightbulb />
              To go the next question:
            </p>
            <p>
              {
                'say: "Please go to the next question" or simply "Next question".'
              }
            </p>
          </div>
          <div className="text-left mt-2">
            <p className="flex items-center gap-1 font-medium">
              <FaRegLightbulb />
              To repeat the question:
            </p>
            <p>
              {
                'say: "Could you please repeat the question" or simply "Repeat question".'
              }
            </p>
          </div>
        </div>
        <button
          className="bg-white border border-black/20 py-3 px-5 rounded-lg mt-8 mb-3 hover:scale-110 transition-all"
          onClick={() => setGoNext(true)}
        >
          Continue
        </button>
      </div>
      <Link
        href={"/"}
        className="text-[4rem] absolute -translate-x-[50%] -translate-y-[50%] top-[10%] left-[7%] hidden sm:block"
      >
        <IoArrowBackCircleOutline />
      </Link>
    </motion.section>
  );
}

export default FirstPage;
