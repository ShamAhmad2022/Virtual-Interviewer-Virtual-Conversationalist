"use client";

import React, { useState } from "react";
import FirstPage from "./FirstPage";
import { introduction, conversationTopic } from "@/lib/data/conversations";
import VirtualConversationalist from "./VirtualConversationalist";

function VirtualIntreviewerPage() {
  const [goNext, setGoNext] = useState(false);
  const [convTopic, setConvTopic] = useState(conversationTopic[0]);
  const [conversation, SetConversation] = useState(introduction);

  return (
    <>
      {!goNext ? (
        <FirstPage
          setGoNext={setGoNext}
          convTopic={convTopic}
          setConvTopic={setConvTopic}
          SetConversation={SetConversation}
          conversation={conversation}
        />
      ) : (
        <VirtualConversationalist
          setGoNext={setGoNext}
          convTopic={convTopic}
          setConvTopic={setConvTopic}
          conversation={conversation}
        />
      )}
    </>
  );
}

export default VirtualIntreviewerPage;
