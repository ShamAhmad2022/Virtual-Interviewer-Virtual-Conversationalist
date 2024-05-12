import React from "react";
import { motion } from "framer-motion";

function AboutVirConIn() {
  return (
    <section className="w-[100%] flex flex-col lg:flex-row justify-center items-center gap-10 min-[1919px]:gap-40 sm:gap-20 p-10 mb-8 sm:mb-20 ">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-[100%] sm:w-[80%] lg:w-[40%] min-[1919px]:w-[35%]"
      >
        <div className="w-[100%] h-[300px] sm:h-[250px] bg-[#977244] p-10 rounded-lg text-center rotate-3 lg:-rotate-6 transition-all hover:rotate-0">
          <h3 className="text-[2rem] text-white leading-none mb-3">Virtual Conversationalist</h3>
          <p className="text-[1.2rem] text-white/80">
            Choose a conversation and read your part. Once you{"'"}ve finished, you
            can restart the conversation or select a new one.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[100%] sm:w-[80%] lg:w-[40%] min-[1919px]:w-[35%]"
      >
        <div className="w-[100%] h-[320px] sm:h-[250px] bg-[#357383] p-10 rounded-lg text-center -rotate-3 lg:rotate-6 transition-all hover:rotate-0">
          <h3 className="text-[2rem]  text-white leading-none mb-3">Virtual Intreviewer</h3>
          <p className="text-[1.2rem]  text-white/80">
            Choose a position, listen to each question, and then provide your answer. You can change the order of the questions and specify where to start and end.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutVirConIn;
