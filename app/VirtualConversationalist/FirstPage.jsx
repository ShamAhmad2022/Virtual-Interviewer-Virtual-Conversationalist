"use client";

import React, { useEffect } from "react";
import {
  conversationTopic,
  introduction,
  favoriteVideoGame,
  bestProgrammingLanguage,
  friendsFansOnly
} from "@/lib/data/conversations";
import { motion } from "framer-motion";
import { FiArrowRightCircle } from "react-icons/fi";
import Link from "next/link";
import { FaRegLightbulb } from "react-icons/fa6";

function FirstPage({ setGoNext, convTopic, setConvTopic, SetConversation }) {
  useEffect(() => {
    switch (convTopic) {
      case "Introduction":
        SetConversation(introduction);
        break;
      case "Favorite video game":
        SetConversation(favoriteVideoGame);
        break;
      case "Best programming language":
        SetConversation(bestProgrammingLanguage);
        break;
      case "f.r.i.e.n.d.s fans only":
        SetConversation(friendsFansOnly);
        break;
    }
  }, [convTopic]);

  return (
    <motion.section
      className="flex justify-center items-center w-[100%] h-[100vh] text-[#6d4c2d]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-[#f7ead7] border border-[#c9a27e] pt-24 pb-16 sm:p-10 min-[1919px]:py-32 rounded-lg w-[90%] sm:w-[75%] lg:w-[40%] text-center text-[1.2rem]">
        <Link
          href={"/"}
          className="opacity-70 text-[2.5rem] absolute -translate-x-[50%] -translate-y-[50%] min-[300px]:top-[10%]  min-[389px]:top-[24%]  top-[24%] right-[5%] block sm:hidden"
        >
          <FiArrowRightCircle />
        </Link>
        <h3 className="text-[1.7rem] sm:text-[3rem] font-semibold sm:font-normal leading-none break-words">
          Virtual Conversationalist
        </h3>

        <div className="flex flex-col w-[90%] sm:w-[80%] p-10 m-auto">
          <label>Select conversation topic:</label>
          <select
            className="bg-white border border-black/20 h-[50px] rounded-lg cursor-pointer outline-none text-center"
            defaultValue={conversationTopic[0]}
            onChange={(e) => setConvTopic(e.target.value)}
          >
            {conversationTopic.map((sentence, index) => (
              <option key={index} value={sentence} className="text-center">
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
                "-2px -2px 0#f7ead7, 2px -2px 0#f7ead7, -2px 2px 0#f7ead7, 2px 2px 0#f7ead7",
            }}
          >
            Tips:{" "}
          </h4>
          <div className="text-left">
            <div className="flex items-start gap-3 font-medium">
              <FaRegLightbulb className="text-[1.9rem]" />
              <p>
                Each conversation has two speakers, A and B.
                <b>You should read B.</b>
              </p>
            </div>
          </div>
        </div>

        <button
          className="bg-white border border-black/20 py-3 px-5 rounded-lg mt-8  hover:scale-110 transition-all"
          onClick={() => setGoNext(true)}
        >
          Continue
        </button>
      </div>
      <Link
        href={"/"}
        className="text-[4rem] absolute -translate-x-[50%] -translate-y-[50%] top-[12%] right-[4%] hidden sm:block"
      >
        <FiArrowRightCircle />
      </Link>
    </motion.section>
  );
}

export default FirstPage;
