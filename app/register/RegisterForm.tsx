"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { Input } from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Cuenta creada");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/cart");
            router.refresh();
            toast.success("Conectado");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((error) => {
        toast.error(
          `Algo salió mal al realizar la solicitud: ${error.message}`
        );
      });
  };

  if (currentUser) {
    return <p className="text-center">Sesión iniciada. Redirigiendo...</p>;
  }

  return (
    <>
      <Heading title="Crear una cuenta en KuskaShop" />

      <Button
        outline
        label="Crear cuenta con Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />

      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="name"
        label="Nombre"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Cargando" : "Crear cuenta"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />

      <p className="text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link className="underline" href={"/login"}>
          Iniciar sesión
        </Link>{" "}
      </p>
    </>
  );
};
