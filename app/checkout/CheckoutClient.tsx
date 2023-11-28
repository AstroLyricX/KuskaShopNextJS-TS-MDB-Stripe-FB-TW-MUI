"use client";

import { useCart } from "@/hooks/useCart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckoutForm } from "./CheckoutForm";
import { Button } from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  console.log("payment:", paymentIntent);
  console.log("c-secret:", clientSecret);

  useEffect(() => {
    // create a paymentintent as soon as the page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log("Error", error);
          toast.error("Algo salió mal");
        });
    }
  }, [cartProducts, handleSetPaymentIntent, paymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && (
        <div className="text-center">
          Cargando información de pago, por favor espera un momento...
        </div>
      )}
      {error && (
        <div className="text-center text-rose-500">
          Oops, algo no salió como esperábamos. Por favor, inténtalo de nuevo
          más tarde.
        </div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-teal-500 text-center">
            ¡Pago completado con éxito!
          </div>
          <div className="max-w-[220px] w-full">
            <Button
              label="Ver detalles de tus pedidos"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};
