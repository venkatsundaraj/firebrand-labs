"use client";

import React, {
  FC,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import UseWebcam from "@/app/_components/hooks/use-webcam";
import { Button } from "@/app/_components/button";
import {
  dataURIToBlob,
  fileToGenerativePart,
  GenerativePart,
} from "@/lib/ai-helpers";
import { GenerateContentResult } from "@google/generative-ai";
import { chat, ExtractedData } from "@/lib/ai-config";

interface pageProps {}

type Fn = (value: JSONValue) => JSONValue;
type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

// -----------------------------------------------------------

const main = function () {
  const value = [
    "ab",
    "def",
    "ac",
    "efc",
    "ab",
    "lm",
    "mnp",
    "ijklm",
    "mnop",
    "st",
    "nopqrs",
    "uvw",
  ];

  const alphaphets = "abcdefghijklmnopqrstuvwxyza";

  const result = new Set();
  const previousValue = [];
  for (const val of value) {
    // const splt = val.split('')

    // const alsplit = alphaphets.split('')
    // const indx =  alsplit.findIndex(item=>splt[0]===item)

    if (alphaphets.includes(val)) {
      previousValue.push(val);
    }
  }

  const res = previousValue.sort((a, b) => b.length - a.length);
  console.log(res[0]);
};

// -----------------------------------------------------------
const page: FC<pageProps> = ({}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { initWebcam, isReady, stream, captureFrame, stopWebcam } = UseWebcam();

  useEffect(() => {
    initWebcam()
      .then((stream) => {
        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.log(err));

    return () => stopWebcam();
  }, []);

  const takePicture = async function () {
    if (isReady && canvasRef.current && videoRef.current) {
      const capture = captureFrame(canvasRef.current, videoRef.current);
      const imageFile = new File([dataURIToBlob(capture)], "image/jpg", {
        type: "image/jpeg",
      });
      const image: GenerativePart = await fileToGenerativePart(imageFile);

      const prompt = "could you describe abou this image?";

      const result: GenerateContentResult = await chat.sendMessage([
        prompt,
        image,
      ]);

      const text = result.response.text();
      const { poetic }: ExtractedData = JSON.parse(text);
      console.log(poetic);
    }
  };
  return (
    <main className="w-screen h-screen flex items-center justify-center gap-4 flex-col">
      <video width={600} height={200} ref={videoRef} autoPlay />
      <Button
        className="bg-foreground hover:border-white hover:outline-foreground"
        onClick={takePicture}
        disabled={!isReady}
      >
        Take Picture
      </Button>
      <canvas className="hidden" ref={canvasRef} width={500} height={200} />
    </main>
  );
};

export default page;
