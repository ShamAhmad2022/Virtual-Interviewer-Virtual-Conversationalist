import { useEffect, useState } from "react";

function useSpeechSynthesis() {
  const [voices, setVoices] = useState([]);
  const [speakerType, setSpeakerType] = useState("Male");
  const [maleSpeaker, setMaleSpeaker] = useState(null);
  const [femaleSpeaker, setFemaleSpeaker] = useState(null);

  const speechSynthesisInstance = new SpeechSynthesisUtterance();

  useEffect(() => {
    function setVoicesHandler() {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      } else {
        console.log("(on first load) Waring!! Did not get voices successfully");
      }
    }

    setVoicesHandler();

    window.speechSynthesis.onvoiceschanged = setVoicesHandler;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  //lang: "en-GB"
  //name: 'Google UK English Female'
  //name: 'Google UK English Male'
  //name: 'Microsoft Libby Online (Natural) - English (United Kingdom)'
  //name: 'Google UK English Male'
  useEffect(() => {
    // console.log("!!!!!!", voices, "!!!!!!");
    if (voices) {
      voices.map((voice) => {
        if (voice.name === "Google UK English Male") {
          setMaleSpeaker(voice);
        } else if (
          voice.name ===
          "Microsoft Ryan Online (Natural) - English (United Kingdom)"
        ) {
          setMaleSpeaker(voice);
        }
      });

      voices.map((voice) => {
        if (voice.name === "Google UK English Female") {
          setFemaleSpeaker(voice);
        } else if (
          voice.name ===
          "Microsoft Libby Online (Natural) - English (United Kingdom)"
        ) {
          setFemaleSpeaker(voice);
        }
      });
    }
  }, [voices]);

  const speechGivenText = (text) => {
    speechSynthesisInstance.text = text;
    if (voices.length > 0) {
      // Testing
      // voices.map((voice) => {
      //   if (voice.lang === "en-GB") {
      //     console.log("!!!!!!", voice, "!!!!!!");
      //   }
      // });
      const selectedVoice =
        speakerType === "Male" ? maleSpeaker : femaleSpeaker;
      speechSynthesisInstance.voice = selectedVoice || voices[0];
    } else {
      console.log("Warning!! Did not get voices successfully");
    }
    window.speechSynthesis.speak(speechSynthesisInstance);
  };

  const changeSpeakerVoice = (maleOrFemale) => {
    setSpeakerType(maleOrFemale);
  };

  return {
    speechGivenText,
    changeSpeakerVoice,
  };
}

export default useSpeechSynthesis;
