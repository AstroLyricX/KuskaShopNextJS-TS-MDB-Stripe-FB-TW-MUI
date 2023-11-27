"use client";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { ItemContent } from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

export const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmout } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Tu carrito está vacío</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2 "
          >
            <MdArrowBack />
            <span>Iniciar compras</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Carrito de compras" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8 ">
        <div className="col-span-2 justify-self-start ">PRODUCTO</div>
        <div className="justify-self-center">PRECIO</div>
        <div className="justify-self-center">CANTIDAD</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button
            label="Vaciar Todo"
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
          />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-bold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmout)}</span>
          </div>
          <p className="text-slate-500">
            Impuestos y envío se calculan al finalizar la compra.
          </p>
          <Button
            label={
              currentUser ? "Finalizar compra" : "Iniciar sesión para pagar"
            }
            outline={currentUser ? false : true}
            onClick={() => {
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
          />

          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2 "
          >
            <MdArrowBack />
            <span>Continuar comprando</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
