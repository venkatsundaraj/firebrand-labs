"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { useRef, useState, MutableRefObject } from "react"

interface ExperienceFBLProps {}

const ExperienceFBL: FC<ExperienceFBLProps> = ({}) => {
  const { scrollY } = useScroll()
  const sectionRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement>(null)

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(
      latest,
      // @ts-ignore
      sectionRef.current.offsetTop - sectionRef.current.clientHeight,
      latest -
        // @ts-ignore
        (sectionRef.current.offsetTop - sectionRef.current.clientHeight)
    )
    // @ts-ignore
    const primaryCondition =
      // @ts-ignore
      latest > sectionRef.current.offsetTop - sectionRef.current.clientHeight
    if (primaryCondition) {
      const value =
        (latest -
          // @ts-ignore
          (sectionRef.current.offsetTop - sectionRef.current.clientHeight)) /
        // @ts-ignore
        sectionRef.current?.clientHeight

      console.log(value * 100)
    }
  })

  return (
    <section
      ref={sectionRef}
      className="min-w-screen min-h-screen flex items-center justify-center relative before:content-[''] before:w-8 before:h-8 before:bg-foreground before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-lg"
    >
      <div className="container">
        <div className=" grid sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col items-start justify-center gap-4">
            <h2 className="font-heading text-secondary_heading text-foreground leading-normal">
              <strong>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor
                sit amet, consectetur adipiscing elit.
              </strong>
            </h2>
            <p className=" font-paragraph text-foreground text-paragraph_heading max-w-xl leading-8">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commo consequat. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commo consequat. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commo
              consequat.
            </p>
            <Button variant={"secondary"}>Read Our Book</Button>
          </div>
          <div className=""></div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceFBL
