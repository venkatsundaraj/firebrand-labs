import { Button } from "@/components/ui/button"
import { FC } from "react"

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <section className="min-w-screen min-h-screen flex items-center justify-center flex-col">
        <div className="min-w-screen min-h-screen flex items-center justify-center gap-4 flex-col">
          <div className="container min-w-screen min-h-screen flex items-center justify-center gap-4 flex-col ">
            <h1 className="font-heading text-primary_heading text-foreground text-center leading-normal">
              செயல்
            </h1>
            <span className="font-paragraph text-foreground text-center text-sm">
              /say-yel/ verb
            </span>
            <p className=" font-paragraph text-foreground text-center text-super_paragraph_heading max-w-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit
              amet, consectetur adipiscing elit
            </p>
          </div>
        </div>
        <div className="min-w-screen min-h-screen flex items-center justify-center gap-4 flex-col">
          <div className="container min-w-screen min-h-screen">
            <div className=" grid sm:grid-cols-1 md:grid-cols-2">
              <div className=""></div>
              <div className="flex flex-col items-start justify-center gap-4">
                <h2 className="font-heading text-secondary_heading text-foreground leading-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor
                  sit amet, consectetur adipiscing elit.
                </h2>
                <p className=" font-paragraph text-foreground text-paragraph_heading max-w-xl leading-8">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commo consequat. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commo consequat. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commo consequat.
                </p>
                <Button variant={"secondary"}>Read Our Book</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="min-w-screen min-h-screen flex items-center justify-center">
        <div className="container min-w-screen min-h-screen">
          <div className=" grid sm:grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-start justify-center gap-4">
              <h2 className="font-heading text-secondary_heading text-foreground leading-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor
                sit amet, consectetur adipiscing elit.
              </h2>
              <p className=" font-paragraph text-foreground text-paragraph_heading max-w-xl leading-8">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commo consequat. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commo consequat. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commo
                consequat.
              </p>
              <Button variant={"secondary"}>Read Our Book</Button>
            </div>
            <div className=""></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
