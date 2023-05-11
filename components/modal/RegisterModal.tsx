"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../shared/Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isloading, setIsloading] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    axios
      .post("/api/register", data)
      .then((res) => {
        toast.success("account berhasil dibuat");
        loginModal.onOpen();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsloading(false);
        registerModal.onClose();
      });
  };

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="welcome to Kyouka"
        subtitle="Create an account"
      />
      <Input
        id="email"
        type="email"
        label="email"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isloading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-3 mt-3">
      <Button
        outline
        label="Continue with google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="mt-4 text-neutral-500 text-center font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>All ready have an account ?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isloading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
