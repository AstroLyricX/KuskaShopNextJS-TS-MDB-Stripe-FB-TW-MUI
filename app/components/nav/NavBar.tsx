import Link from "next/link";
import { Container } from "../Container";
import { Redressed } from "next/font/google";
import { CartCount } from "./CartCount";
import { UserMenu } from "./UserMenu";
import { getCurrenUser } from "@/actions/getCurrenUser";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const NavBar = async () => {
  const currentUser = await getCurrenUser();
  return (
    <div
      className="
        sticky
        top-0
        w-full
        bg-slate-200
        z-30
        shadow-sm
        "
    >
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-black text-3xl`}
            >
              KuskaShop
            </Link>
            <div className="hidden md:block">Buscar</div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
