"use client";

import { useEffect, useRef, useState } from "react";
import useSpeechReco from "@/lib/hooks/SpeechRecoHook";
import useSpeechSynthesis from "@/lib/hooks/SpeechSynthHook";
import { motion } from "framer-motion";
import { IoMdOptions } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa6";
import clsx from "clsx";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { conversationTopic } from "@/lib/data/conversations";
import { GrPowerReset } from "react-icons/gr";

function VirtualConversationalist({
  setGoNext,
  conversation,
  convTopic,
  setConvTopic,
}) {
  const [currentConversation, setCurrentConversation] = useState(
    conversation.slice(0, 2)
  );

  const conversationRef = useRef(null);
  const [index, setIndex] = useState(1);

  const [start, setStart] = useState(false);

  const [userTrun, setUserTrun] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [voiceChanged, setVoiceChanged] = useState(false);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#F2fcff",
      maxWidth: 300,
      maxHeight: 400,
      fontSize: "1rem",
      border: "1px solid #dadde9",
      overflowY: "auto",
    },
  }));

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    setTranscriptToEmpty,
  } = useSpeechReco({ continuous: true });

  const { speechGivenText, changeSpeakerVoice } =
    useSpeechSynthesis();

  // Testing
  // console.log(
  //   " transcript: ",
  //   transcript,
  //   "\n",
  //   "index: ",
  //   index,
  //   "\n",
  //   "currentConversation: ",
  //   currentConversation
  // );

  useEffect(() => {
    if (index < conversation.length) {
      if (userTrun) {
        setUserTrun(false);
        setIndex((index) => index + 2);
        setTranscriptToEmpty();
        speechGivenText(conversation[index + 1].replace(/\*/g, ""));
        setCurrentConversation([
          ...currentConversation,
          conversation[index + 1],
          conversation[index + 2],
        ]);
      }
    }

    if (index === conversation.length) {
      stopListening();
    }
  }, [index, userTrun]);

  useEffect(() => {
    if (index < conversation.length) {
      //Testing
      // console.log(
      //   "useEffect",
      //   currentConversation[index] === transcript,
      //   " | ",
      //   currentConversation[index]
      //     .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      //     .toLowerCase()
      //     .trim(),
      //   " | ",
      //   transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").toLowerCase().trim(),
      //   ".....",
      //   currentConversation[index]
      //     .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
      //     .toLowerCase()
      //     .trim().length,
      //   " | ",
      //   transcript.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").toLowerCase().trim().length
      // );
      if (
        currentConversation[index]
          .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
          .toLowerCase()
          .trim() ===
          transcript
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "")
            .toLowerCase()
            .trim() &&
        index < conversation.length - 1
      ) {
        setUserTrun(true);
      }
    }
  }, [transcript]);

  useEffect(() => {
    // Scroll to the bottom when currentConversation changes
    if (conversationRef.current)
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
  }, [currentConversation]);

  const onStart = () => {
    setStart(true);
    speechGivenText(conversation[0]);
    startListening();
  };

  const restart = () => {
    if (!start) return;

    if (!isListening) {
      setTranscriptToEmpty();
      setIndex(1);
      startListening();
    }

    speechGivenText(conversation[0]);
    setCurrentConversation(conversation.slice(0, 2));
    setIndex(1);
  };

  return (
    <motion.main
      className="flex flex-col justify-between items-center h-[100vh] transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-[#c0e6f1] w-[100%] flex flex-col justify-center items-center py-8 lg:p-5 transition-all">
        <div className=" w-[90%] flex justify-between items-center text-[#543a13] text-[2.5rem]">
          {/*option button for small screen (down)*/}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="block transition-all text-[2.2rem] cursor-pointer bg-black/5 rounded-xl p-2 border border-white hover:scale-110 sm:hidden"
          >
            <IoMdOptions onClick={() => setShowOptions(!showOptions)} />
          </motion.button>
          {/*option button for small screen (up)*/}

          <div className="flex-row gap-4 items-center hidden sm:flex">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="transition-all cursor-pointer bg-black/5 rounded-xl p-2 border border-white hover:scale-110"
            >
              <IoMdOptions onClick={() => setShowOptions(!showOptions)} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={
                !start
                  ? "cursor-auto bg-black/2 rounded-xl p-2 border border-white transition-all"
                  : "transition-all cursor-pointer bg-black/5 rounded-xl p-2 border border-white hover:scale-110"
              }
            >
              <GrPowerReset
                className={!start ? "opacity-20" : "opacity-100"}
                onClick={restart}
              />
            </motion.button>
          </div>

          <div className="flex flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[1.7rem] mb-4 leading-none font-semibold"
            >
              Virtual Conversationalist
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-[1.2rem]"
            >
              {convTopic}
            </motion.p>
          </div>

          {/*back button for small screen (down)*/}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="block transition-all text-[2.5rem] cursor-pointer hover:scale-110 sm:hidden"
          >
            <FiArrowRightCircle
              onClick={() => {
                setGoNext(false);
                setConvTopic(conversationTopic[0]);
              }}
            />
          </motion.button>
          {/*back button for small screen (up)*/}

          <div className="flex-row gap-4 hidden sm:flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <HtmlTooltip
                title={
                  <div className="px-3 py-6 text-[#543a13]">
                    <div className="flex items-start gap-3 font-medium">
                      <FaRegLightbulb className="text-[1.9rem]" />
                      <p>
                        Each conversation has two speakers, A and B.
                        <b>You should read B.</b>
                      </p>
                    </div>
                  </div>
                }
              >
                <button className="transition-all cursor-pointer bg-black/5 rounded-xl p-2 border border-white hover:scale-110">
                  <FaRegLightbulb className=" text-[#543a13] text-[2.5rem]" />
                </button>
              </HtmlTooltip>
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="transition-all text-[3.6rem] cursor-pointer hover:scale-110"
            >
              <FiArrowRightCircle
                onClick={() => {
                  setGoNext(false);
                  setConvTopic(conversationTopic[0]);
                }}
              />
            </motion.button>
          </div>
        </div>

        {showOptions && (
          <motion.div
            className="flex gap-4 flex-wrap justify-center items-center px-3 sm:px-0 pt-8 text-[#543a13]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/*restart and tips buttons for small screen (down)*/}
            <button
              className={
                !start
                  ? "block text-[2rem] cursor-auto bg-black/2 rounded-xl p-2 border border-white transition-all sm:hidden"
                  : "block transition-all text-[2rem] cursor-pointer bg-[#F2fcff]/70 rounded-xl p-2 hover:scale-110 sm:hidden"
              }
            >
              <GrPowerReset
                className={!start ? "opacity-20" : "opacity-100"}
                onClick={restart}
              />
            </button>

            <div>
              <HtmlTooltip
                title={
                  <div className="px-3 py-6 text-[#543a13]">
                    <div className="flex items-start gap-3 font-medium">
                      <FaRegLightbulb className="text-[1.9rem]" />
                      <p>
                        Each conversation has two speakers, A and B.
                        <b>You should read B.</b>
                      </p>
                    </div>
                  </div>
                }
              >
                <button className="block bg-[#F2fcff]/70 transition-all cursor-pointer rounded-xl p-2 hover:scale-110 sm:hidden">
                  <FaRegLightbulb className=" text-[#543a13] text-[2rem]" />
                </button>
              </HtmlTooltip>
            </div>
            {/*restart and tips buttons for small screen (up)*/}

            <div>
              <HtmlTooltip
                title={
                  <div className="p-5 text-[#543a13]">
                    <ul className="list-decimal">
                      {conversation.map((sentence, cIndex) => {
                        if (cIndex % 2 === 0)
                          return (
                            <div
                              key={cIndex}
                              className="flex flex-row gap-4 mb-3"
                            >
                              A: <p>{sentence}</p>
                            </div>
                          );
                        else if (cIndex >= conversation.length) return;
                        else
                          return (
                            <div
                              key={cIndex}
                              className="flex flex-row gap-4 mb-3"
                            >
                              B: <p>{sentence}</p>
                            </div>
                          );
                      })}
                    </ul>
                  </div>
                }
              >
                <button className="bg-[#F2fcff]/70 py-3 px-5 rounded-lg hover:scale-105 transition-all">
                  Show Questions
                </button>
              </HtmlTooltip>
            </div>

            <div className="flex gap-2 items-center">
              Voice:
              <button
                className={clsx(
                  "bg-[#E4F5FA]/70 py-3 px-5 rounded-full hover:scale-105 transition-all",
                  {
                    " border-2 border-[#77b7cb]": !voiceChanged,
                  }
                )}
                onClick={() => {
                  changeSpeakerVoice("Male");
                  setVoiceChanged(!voiceChanged);
                }}
              >
                Male
              </button>
              <button
                className={clsx(
                  "bg-[#FFF4FE]/70 py-3 px-5 rounded-full hover:scale-105 transition-all",
                  {
                    "border-2 border-[#E5A4EC]": voiceChanged,
                  }
                )}
                onClick={() => {
                  changeSpeakerVoice("Female");
                  setVoiceChanged(!voiceChanged);
                }}
              >
                Female
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[90%] sm:w-[85%] lg:w-[60%] h-[440px] bg-[#f7ead7] rounded-lg flex flex-col justify-center items-center text-[#1e4856] p-2 sm:p-4"
      >
        {!start ? (
          <>
            <p className="text-[1.7rem] mb-10 sm:mb-5 text-center">
              Press on start button whenever you are ready
            </p>
            <button
              className="bg-gray-100 rounded-lg py-4 px-8 text-[1.5rem]"
              onClick={onStart}
            >
              Start
            </button>
          </>
        ) : (
          <div
            className="w-[95%] h-[95%] sm:h-[90%] bg-[#fff8ed] rounded-lg scroll-smooth overflow-auto p-5 sm:p-12 text-[1.5rem] sm:text-[2rem] scrollbar-thin scrollbar-thumb-[#477f92] scrollbar-track-white"
            ref={conversationRef}
          >
            <div className="flex flex-col gap-10 py-5">
              {currentConversation.map((sentence, cIndex) => {
                if (cIndex % 2 === 0)
                  return (
                    <div key={cIndex} className="flex flex-row gap-2 sm:gap-4">
                      A: <p>{sentence}</p>
                    </div>
                  );
                else if (cIndex >= conversation.length) return;
                else
                  return (
                    <div
                      key={cIndex}
                      className={clsx("flex flex-row items-center gap-4", {
                        "opacity-30": index === cIndex,
                      })}
                    >
                      <div className="flex flex-row items-start gap-2 sm:gap-4">
                        B: <p>{sentence}</p>{" "}
                      </div>
                      {index === cIndex && <FaMicrophoneAlt />}
                    </div>
                  );
              })}
            </div>
            {index === conversation.length && (
              <div className="flex justify-center items-center opacity-50 mt-5 text-center">
                <small className="w-[95%] sm:w-[70%] text-[1rem]">
                  this is the end of the conversation, you can restart or select
                  another conversation.
                </small>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <div className="bg-[#c0e6f1] w-[100%] h-[60px] flex justify-center items-center text-[#1e4856] text-[1.4rem]"></div>
    </motion.main>
  );
}

export default VirtualConversationalist;
