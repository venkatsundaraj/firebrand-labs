import { navigationItem } from "@/config/marketing";
import Link from "next/link";

import { FC } from "react";
import { Button } from "./ui/button";

interface NavItemsProps {}

const NavItems: FC<NavItemsProps> = ({}) => {
  return (
    <nav className="flex items-center justify-center gap-8 bg-transparent font-paragraph text-paragraph_heading">
      {navigationItem.length
        ? navigationItem.map((item, i) => (
            <Link
              className="text-foreground font-paragraph text-subtitle_heading"
              href={item.tagUrl}
              key={i}
            >
              {item.tagName}
            </Link>
          ))
        : null}
      <button className="text-foreground text-subtitle_heading  border-none hover:bg-transparent hover:text-foreground">
        Menu
      </button>
    </nav>
  );
};

export default NavItems;
