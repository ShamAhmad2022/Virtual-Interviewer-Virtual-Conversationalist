"use client";

import { useEffect, useRef, useState } from "react";
import useSpeechReco from "@/lib/hooks/SpeechRecoHook";
import useSpeechSynthesis from "@/lib/hooks/SpeechSynthHook";
import { motion } from "framer-motion";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoMdOptions } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { FaRegLightbulb } from "react-icons/fa6";
import clsx from "clsx";
import Switch from "@mui/material/Switch";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { FaMicrophoneAlt } from "react-icons/fa";

function VirtualIntreviewer({ setGoNext, position, setPosition, array }) {
  const lastQuestion =
    "this is the end of the interview, thank you for your time";

  const [originalArray, setOriginalArray] = useState(array);

  const nextPromtRegex = /(?=.*next)(?=.*question)/i; //Please go to the next question
  const repeatPromtRegex = /(?=.*repeat)(?=.*question)/i; //Could you please repeat the question

  const [spokenSentences, setSpokenSentences] = useState([originalArray[0]]);

  const [index, setIndex] = useState(1);

  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(originalArray.length);

  const [start, setStart] = useState(false);
  const [showUserSpeech, setShowUserSpeech] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [voiceChanged, setVoiceChanged] = useState(false);

  const startSelect = useRef(null);
  const endSelect = useRef(null);

  const label = { inputProps: { "aria-label": "Switch demo" } };

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

  useEffect(() => {
    if (nextPromtRegex.test(transcript) && index <= originalArray.length - 1) {
      setIndex((index) => index + 1);
      setSpokenSentences([...spokenSentences, originalArray[index]]);
      setTranscriptToEmpty();
      speechGivenText(originalArray[index]);
    }

    if (repeatPromtRegex.test(transcript)) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      speechGivenText(originalArray[index - 1]);
    }

    if (nextPromtRegex.test(transcript) && index === originalArray.length) {
      speechGivenText(lastQuestion);
      setIndex((index) => index + 1);
      setSpokenSentences([...spokenSentences, lastQuestion]);
    }

    if (nextPromtRegex.test(transcript) && index === originalArray.length + 1) {
      stopListening();
    }
  }, [index, spokenSentences, transcript]);

  useEffect(() => {
    setOriginalArray(array.slice(startValue, endValue + 1));
    setSpokenSentences([originalArray[0]]);
  }, [startValue, endValue]);

  useEffect(() => {
    setSpokenSentences([originalArray[0]]);
  }, [originalArray]);

  const onStart = () => {
    setStart(true);
    speechGivenText(originalArray[index - 1]);
    startListening();
  };

  const restart = () => {
    if (!start) return;

    if (!isListening) {
      setTranscriptToEmpty();
      setIndex(0);
      startListening();
    }

    speechGivenText(originalArray[0]);
    setSpokenSentences([originalArray[0]]);
    setIndex(1);
  };

  const resetQestions = () => {
    setOriginalArray(array);
    setSpokenSentences([originalArray[0]]);
    startSelect.current.value = 0;
    endSelect.current.value = array.length - 1;
  };

  const shuffle = () => {
    let shuffledpart = originalArray.slice(index - 1);
    setOriginalArray(originalArray.slice(0, index - 1));
    shuffledpart.sort(() => Math.random() - 0.5);
    setOriginalArray((prevArray) => [...prevArray, ...shuffledpart]);
    setSpokenSentences([originalArray[0]]);
  };

  return (
    <motion.main
      className="flex flex-col justify-between items-center h-[100vh] transition-all"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-[#f7ead7] w-[100%] flex flex-col justify-center items-center py-8 lg:p-5 transition-all">
        <div className="w-[90%] flex justify-between items-center text-[#1e4856] text-[2.5rem]">
          {/*back button for small screen*/}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="block transition-all text-[3rem] cursor-pointer hover:scale-110 sm:hidden"
          >
            <IoArrowBackCircleOutline
              onClick={() => {
                setGoNext(false);
                setPosition("Frontend Developer");
              }}
            />
          </motion.button>
          {/*back button for small screen*/}

          <div className="flex-row gap-4 items-center hidden sm:flex">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="transition-all text-[3.6rem] cursor-pointer hover:scale-110"
            >
              <IoArrowBackCircleOutline
                onClick={() => {
                  setGoNext(false);
                  setPosition("Frontend Developer");
                }}
              />
            </motion.button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <HtmlTooltip
                title={
                  <div className="p-3 text-[#1e4856]">
                    <b className="flex items-center gap-1">
                      <FaRegLightbulb />
                      {"To go the next question: "}
                    </b>{" "}
                    <p>
                      {
                        'say: "Please go to the next question" or simply "Next question"'
                      }
                    </p>
                    <hr className="my-4"></hr>
                    <b className="flex items-center gap-1">
                      <FaRegLightbulb />
                      {"To repeat the question: "}
                    </b>{" "}
                    <p>
                      {
                        'say: "Could you please repeat the question" or simply "Repeat question"'
                      }
                    </p>
                  </div>
                }
              >
                <button className="transition-all cursor-pointer bg-black/5 rounded-xl p-2 border border-white hover:scale-110">
                  <FaRegLightbulb className=" text-[#1e4856] text-[2.5rem]" />
                </button>
              </HtmlTooltip>
            </motion.div>
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[2.3rem] mb-4 leading-none font-meduim"
            >
              Virtual interviewer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-[1.2rem]"
            >
              {position}
            </motion.p>
          </div>

          {/*option button for small screen (down)*/}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="block transition-all text-[2.5rem] cursor-pointer bg-black/5 rounded-xl p-2 border border-white hover:scale-110 sm:hidden"
          >
            <IoMdOptions onClick={() => setShowOptions(!showOptions)} />
          </motion.button>
          {/*option button for small screen (up)*/}

          <div className="flex-row gap-4 hidden sm:flex">
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
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="transition-all cursor-pointer bg-black/5 rounded-xl p-2 border border-white hover:scale-110"
            >
              <IoMdOptions onClick={() => setShowOptions(!showOptions)} />
            </motion.button>
          </div>
        </div>

        {showOptions && (
          <motion.div
            className="flex gap-4 flex-wrap justify-center items-center px-3 sm:px-0 pt-8 text-[#1e4856]"
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
                  <div className="p-3 text-[#1e4856]">
                    <b className="flex items-center gap-1">
                      <FaRegLightbulb />
                      {"To go the next question: "}
                    </b>{" "}
                    <p>
                      {
                        'say: "Please go to the next question" or simply "Next question"'
                      }
                    </p>
                    <hr className="my-4"></hr>
                    <b className="flex items-center gap-1">
                      <FaRegLightbulb />
                      {"To repeat the question: "}
                    </b>{" "}
                    <p>
                      {
                        'say: "Could you please repeat the question" or simply "Repeat question"'
                      }
                    </p>
                  </div>
                }
              >
                <button className="block bg-[#F2fcff]/70 transition-all cursor-pointer rounded-xl p-2 hover:scale-110 sm:hidden">
                  <FaRegLightbulb className="text-[2rem] text-[#1e4856]" />
                </button>
              </HtmlTooltip>
            </div>
            {/*restart and tips buttons for small screen (up)*/}

            <div>
              <HtmlTooltip
                title={
                  <div className="p-3 text-[#1e4856]">
                    <ol className="list-decimal p-4">
                      {originalArray.map((sentence, index) => (
                        <li
                          key={index}
                          className="mb-2 border-b border-[#1e4856]/30 pb-2 last:border-none last:pb-0"
                        >
                          {sentence}
                        </li>
                      ))}
                    </ol>
                  </div>
                }
              >
                <button className="bg-[#F2fcff]/70 py-3 px-5 rounded-lg hover:scale-105 transition-all">
                  Show Questions
                </button>
              </HtmlTooltip>
            </div>

            <div>
              start:{" "}
              <select
                className="bg-[#F2fcff]/70 py-3 px-5 rounded-lg hover:scale-105 transition-all cursor-pointer"
                defaultValue={startValue.toString()}
                onChange={(e) => setStartValue(parseInt(e.target.value))}
                ref={startSelect}
              >
                {array.map((sentence, index) => (
                  <option key={index} value={index.toString()}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              end:{" "}
              <select
                className="bg-[#F2fcff]/70 py-3 px-5 rounded-lg hover:scale-105 transition-all cursor-pointer"
                defaultValue={(endValue - 1).toString()}
                onChange={(e) => setEndValue(parseInt(e.target.value))}
                ref={endSelect}
              >
                {array.map((sentence, index) => (
                  <option key={index} value={index.toString()}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                className="bg-[#F2fcff]/70 py-3 px-5 rounded-lg hover:scale-105 transition-all"
                onClick={resetQestions}
              >
                Reset questions
              </button>
            </div>

            <div>
              <button
                className="bg-[#F2fcff]/70 py-3 px-5 rounded-lg hover:scale-105 transition-all"
                onClick={shuffle}
              >
                shuffle
              </button>
            </div>

            <div className="flex gap-2 items-center">
              Voice:
              <button
                className={clsx(
                  "bg-[#E4F5FA]/70 py-3 px-5 rounded-full hover:scale-105 transition-all",
                  {
                    " border-2 border-[#A4DBEC]": !voiceChanged,
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

            <div>
              Show your speech:
              <Switch
                {...label}
                onClick={() => {
                  setShowUserSpeech(!showUserSpeech);
                }}
              />
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[90%] sm:w-[85%] lg:w-[60%] h-[440px] bg-[#d3e7ee] rounded-lg flex flex-col justify-center items-center text-[#543a13] p-7 sm:p-14"
      >
        {!start ? (
          <>
            <p className="text-[1.7rem] mb-5 text-center">
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
          <p className="text-wrap text-center text-[1.7rem] sm:text-[2rem] opacity-80">
            {index === originalArray.length + 1 ? "" : "Q: "}
            {spokenSentences[index - 1]}
          </p>
        )}

        {showUserSpeech && (
          <p className="opacity-50 m-0 p-0 mt-4 flex items-center gap-2">
            {!start ? (
              <>
                <FaMicrophoneAlt /> <span>Your speech goes here...</span>
              </>
            ) : (
              transcript && (
                <>
                  <FaMicrophoneAlt />
                  {transcript}
                </>
              )
            )}
          </p>
        )}
      </motion.div>

      <div className="bg-[#f7ead7] w-[100%] h-[60px] flex justify-center items-center text-[#1e4856] text-[1.4rem]"></div>
    </motion.main>
  );
}

export default VirtualIntreviewer;
