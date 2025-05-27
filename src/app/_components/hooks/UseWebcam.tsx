"use client";
import { useCallback, useState } from "react";
const UseWebcam = function () {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  const initWebcam = useCallback(async function () {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { height: 600, width: 400 },
      });
      setStream(mediaStream);
      setIsReady(true);
      return mediaStream;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const stopWebcam = useCallback(() => {
    stream?.getTracks().forEach((trck) => trck.stop());
    setStream(null);
    setIsReady(false);
  }, [stream]);

  const captureFrame = useCallback(
    (canvasEl: HTMLCanvasElement, videoEl: HTMLVideoElement) => {
      const context = canvasEl.getContext("2d");
      context?.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      return canvasEl.toDataURL("image/jpeg");
    },
    [stream]
  );

  return {
    initWebcam,
    isReady,
    captureFrame,
    stream,
    stopWebcam,
  };
};

export default UseWebcam;
