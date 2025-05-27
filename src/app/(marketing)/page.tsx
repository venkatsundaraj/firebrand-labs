"use client";

import { Button } from "@/app/_components/button";
import UseWebcam from "@/app/_components/hooks/UseWebcam";
import { buttonVariants } from "@/components/ui/button";
import { chat, ExtractedData } from "@/lib/ai-config";
import {
  dataURIToBlob,
  fileToGenerativePart,
  GenerativePart,
} from "@/lib/ai-helpers";
import { cn } from "@/lib/utils";
import { GenerateContentResult } from "@google/generative-ai";
import { FC, useEffect, useRef, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [content, setContent] = useState<Array<string>>([
    "Hello World",
    "One Two",
  ]);
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

      const prompt =
        "Generate awkward, embarrassing but not explicitly vulgar questions like 'What's your most embarrassing habit?', 'When did you last cry?', 'What's your weirdest fear?'";

      const result: GenerateContentResult = await chat.sendMessage([
        prompt,
        image,
      ]);

      const text = result.response.text();
      const { questions }: ExtractedData = JSON.parse(text);

      setContent([...questions]);
    }
  };
  return (
    <main className="w-screen h-screen flex items-center justify-center gap-4 flex-col">
      <div className="container  flex items-center justify-center gap-4 flex-col">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 items-start justify-center">
          <video width={600} height={200} ref={videoRef} autoPlay />
          <div className="flex flex-col items-start justify-center gap-8">
            <Button
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-sm"
              )}
              onClick={takePicture}
              disabled={!isReady}
            >
              Take Picture
            </Button>
            <ul className="flex gap-4 items-start justify-center flex-col text-4xl">
              {content.map((item, i) => (
                <li
                  className="text-[16px] text-foreground leading-normal border-b "
                  key={i}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <canvas className="hidden" ref={canvasRef} width={500} height={200} />
        </div>
      </div>
    </main>
  );
};

export default page;

// What is the most embarrassing song you secretly love?
// What's the weirdest food combination you enjoy?
// What's the most embarrassing thing you've accidentally sent in a text message?
// Do you have a really unusual habit that only happens at night?
// What's the most ridiculous thing you've ever believed in?
