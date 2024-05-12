"use client";

import { useEffect, useState, useRef } from "react";

function useSpeechReco(options) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef();

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("your browser doesn't support web speech api");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.interimResults = false;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;

    if ("webkitSpeechGrammarList" in window) {
      const grammar =
        "#JSGF V1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;";
      const SpeechRecognitionList = new window.webkitSpeechGrammarList();
      SpeechRecognitionList.addFromString(grammar, 1);
      recognition.grammars = SpeechRecognitionList;
    }

    recognition.onresult = (event) => {
      //1
      // let text = "";
      // for(let i=0; i<event.results.length; i++){
      //     text += event.results[i][0].transcript;
      // }
      // setTranscript(text);

      //2
      // for(let i=0; i<event.results.length; i++){
      //         setTranscript(event.results[i][0].transcript);
      //     // console.log(event.results.length, '| length');
      // }

      //3
      setTranscript(event.results[event.results.length - 1][0].transcript);
    };

    recognition.onerror = (event) => {
      console.error("Error with Speech Recognition: ", event.error);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      //Testing
      //console.log("started!!!!!");
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      //Testing
      //console.log("stopped!!!!!");
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const setTranscriptToEmpty = () => {
    setTranscript(" ");
  };

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    setTranscriptToEmpty,
  };
}

export default useSpeechReco;
