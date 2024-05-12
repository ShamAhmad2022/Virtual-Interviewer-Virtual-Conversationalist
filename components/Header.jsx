import React from "react";
import { motion } from "framer-motion";

function Header() {
  return (
    //video background
    // <header className="relative h-[100vh] flex justify-center items-center text-center">
    //   <video autoPlay muted loop className="absolute top-0 left-0 w-[100%] h-[100%] object-cover -z-10 overflow-hidden">
    //     <source src="https://res.cloudinary.com/dd4yn2x48/video/upload/v1714918022/VICONIN-bg_ic6hvx.mp4" type="video/mp4" />
    //     Your browser does not support the video tag.
    //   </video>
    //   <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#abd1dc]/80 -z-5"></div>
    //   <div className="text-[#376c7c] z-10 flex flex-col items-center text-[2rem] font-bold">
    //     <h1 className="text-[3rem] font-black text-white">VirConIn</h1>
    //     <h2 className=" text-white">Your virtual intreviewer and conversationalist</h2>
    //     <h3 className="w-[75%] my-5">
    //       VirConIn is an interactive web app that helps you to practise for
    //       intreviews and conversations, in order to get better in intreviews and
    //       with speaking in English
    //     </h3>
    //     <div className="w-[100%] flex gap-10 justify-center">
    //     {/* <div className="w-[100%] border-t-4 border-white flex gap-10 justify-center"> */}
    //         <Link href={'/VirtualConversationalist'} className="inline-block mt-10 border-4 border-white px-6 py-3">{"<"}== Virtual Conversationalist</Link>
    //         <Link href={'/VirtualIntreviewer'} className="inline-block mt-10 border-4 border-white px-6 py-3">Virtual Intreviewer =={">"}</Link>
    //     </div>
    //   </div>
    // </header>

    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-[100%] flex justify-center items-center text-center mt-14 sm:mt-24 mb-4 sm:mb-14"
    >
      <div className="w-[100%] flex flex-col justify-center items-center gap-10 sm:gap-5 text-gray-800">
        <h1 className="w-[85%] sm:w-[70%] text-[2.2rem] sm:text-[3.5rem] font-black leading-none">
          <span className="text-[#357383]">Virtual Intreviewer </span>&{" "}
          <span className="text-[#977244]"> Virtual Conversationalist</span>
        </h1>
        <h2 className="w-[90%] sm:w-[85%] lg:w-[70%] text-[1.5rem]">
          To help you in <b>practicing</b> for interviews and conversations,
          with the goal of <b>enhancing</b> your interview skills and English
        </h2>
      </div>
    </motion.header>
  );
}

export default Header;
