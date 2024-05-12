"use client";

import React, { useState } from "react";
import FirstPage from "./FirstPage";
import VirtualIntreviewer from "./VirtualIntreviewer";
import { availablePositions } from "@/lib/data/intreviews";
import { frontendIntreview } from "@/lib/data/intreviews";

function VirtualIntreviewerPage() {
  const [goNext, setGoNext] = useState(false);
  const [position, setPosition] = useState(availablePositions[0]);
  const [array, setArray] = useState(frontendIntreview);

  return (
    <>
      {!goNext ? (
        <FirstPage
          setGoNext={setGoNext}
          setPosition={setPosition}
          setArray={setArray}
          position={position}
        />
      ) : (
        <VirtualIntreviewer
          setGoNext={setGoNext}
          position={position}
          setPosition={setPosition}
          array={array}
        />
      )}
    </>
  );
}

export default VirtualIntreviewerPage;
