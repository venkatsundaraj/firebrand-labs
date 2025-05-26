import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import NavItems from "./nav-items";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="w-full py-6 sm:px-2 md:px-12 bg-transparent sticky top-0">
      <div className="w-full flex items-center justify-between flex-row">
        <Link href={"/"}>
          <Image
            width={200}
            height={40}
            src="https://utfs.io/f/6677bdef-a998-497a-a9ef-3aab7789dbbb-qb60bs.png"
            alt="Firebrand Labs"
          />
        </Link>
        <NavItems />
      </div>
    </header>
  );
};

export default Header;
