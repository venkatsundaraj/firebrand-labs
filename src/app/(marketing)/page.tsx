"use client";

import { Button } from "@/app/_components/button";
import UseWebcam from "@/app/_components/hooks/UseWebcam";
import { buttonVariants } from "@/components/ui/button";
import {
  chat,
  ExtractedData,
  scenarioChat,
  WorstScenarioData,
} from "@/lib/ai-config";
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
  const [content, setContent] = useState<Array<string>>([]);
  const [respose, setRespose] = useState<string>("");
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
  const textClickHanlder = async function (text: string) {
    const prompt = `Based on these questions and answers about a person, create a hilariously exaggerated "worst case scenario" prediction for their future. Make it funny and over-the-top, but not mean-spirited. Think like a playful fortune teller with a sense of humor:

    ${text}
    
    Create a funny worst-case scenario that connects to their answers in an absurd but creative way.`;

    // Send only text prompt (no image needed)
    const result: GenerateContentResult = await scenarioChat.sendMessage(
      prompt
    );

    const responseText: string = result.response.text();
    const scenarioData: WorstScenarioData = JSON.parse(responseText);
    console.log(scenarioData.explanation);

    setRespose(scenarioData.explanation);

    return scenarioData;
  };
  return (
    <main className="w-screen h-screen flex items-center justify-center gap-4 flex-col">
      <div className="container  flex items-center justify-center gap-4 flex-col">
        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 items-start justify-center">
          <video width={600} height={200} ref={videoRef} autoPlay />
          <div className="flex flex-col items-start justify-center gap-8 md:col-start-2 md:col-end-4 disabled:cursor-not-allowed">
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
            {!respose ? (
              <ul className="flex gap-4 items-start justify-start flex-row flex-wrap ">
                {content.map((item, i) => (
                  <li
                    onClick={() => textClickHanlder(item)}
                    className="text-[16px] text-foreground px-4 py-1 leading-normal border-b bg-bakground rounded-full cursor-pointer hover:bg-primary hover:text-background border border-primary"
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
            {respose ? (
              <p className="text-[16px] text-foreground">{respose}</p>
            ) : null}
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
