"use client";

import * as React from "react";
import { FC } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { tags } from "@/config/marketing";
import Autoplay from "embla-carousel-autoplay";

interface CarouselBranding {}

const colors = [
  "bg-red-500",
  "bg-violet-500",
  "bg-orange-500",
  "bg-green-500",
  "bg-yellow-500",
];

const CarouselBranding: FC<CarouselBranding> = function () {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      className=""
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
        active: true,
        skipSnaps: true,
        duration: 2000,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="w-screen h-screen pl-0 ml-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className=" pl-0">
            <div
              className={cn(
                "w-full h-full border-b-primary-foreground flex items-center justify-center",
                colors[index]
              )}
            >
              <h2 className="text-foreground text-5xl">{index + 1}</h2>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center gap-2 absolute bottom-[24px] right-[24px]">
        <CarouselPrevious className="translate-y-0 left-0 right-initial top-initial relative border-none bg-transparent text-white" />
        <h2 className="text-white">{`${current}/${count}`}</h2>
        <CarouselNext className="translate-y-0 left-0 right-initial top-initial relative border-none bg-transparent text-white" />
      </div>
      <div className="flex items-center justify-center gap-2 absolute bottom-[24px] left-[24px]">
        {tags.map((item, index) => (
          <span
            key={index}
            className="bg-foreground py-1 px-3 rounded-full text-background flex items-center justify-center"
          >
            {item.tagName}
          </span>
        ))}
      </div>
    </Carousel>
  );
};

export default CarouselBranding;
