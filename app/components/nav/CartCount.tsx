"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

export const CartCount = () => {
  const router = useRouter();
  const { cartTotalQty } = useCart();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/cart")}
    >
      <div className="text-3xl text-green-500">
        <CiShoppingCart />
      </div>
      <span className="absolute top-[-11px] right-[-11px] bg-green-400 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </div>
  );
};
