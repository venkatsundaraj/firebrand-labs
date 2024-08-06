"use client"

import { FC } from "react"
import { Button } from "@/components/ui/button"
import { useScroll, useMotionValueEvent } from "framer-motion"
import { useRef, useState, MutableRefObject } from "react"
import { cn } from "@/lib/utils"

interface ExperienceFBLProps {}

const ExperienceFBL: FC<ExperienceFBLProps> = ({}) => {
  const [scrollValue, setScrollValue] = useState<number>(0)
  const { scrollY } = useScroll()
  const sectionRef: MutableRefObject<HTMLElement | null> =
    useRef<HTMLElement>(null)

  useMotionValueEvent(scrollY, "change", (latest) => {
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
      const returnValue = Number((value * 100).toFixed(2))
      setScrollValue(returnValue)
    }
  })

  return (
    <section
      ref={sectionRef}
      className={cn(
        "min-w-screen min-h-screen flex items-center overflow-hidden justify-center relative before:content-[''] before:bg-foreground before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-full",
        `before:w-[${scrollValue}%] before:h-[${scrollValue}%] before:transition-width before:transition-height`
      )}
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
