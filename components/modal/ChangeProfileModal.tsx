"use client";

import { useState } from "react";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "../inputs/TextArea";
import axios from "axios";
import { toast } from "react-hot-toast";
import useProfile from "@/hooks/UseProfile";
import Modal from "./Modal";
import ProfileUpload from "../inputs/ProfileUpload";

const ChangeProfileModal = () => {
  const profileModal = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: "",
      description: "",
    },
  });

  const image = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/user", data)
      .then((res) => {
        toast.success("Profile berhasil diedit");
        profileModal.onClose();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        profileModal.onClose();
      });
  };

  const body = (
    <div className="flex flex-col gap-5">
      <ProfileUpload
        value={image}
        onChange={(value) => setCustomValue("image", value)}
      />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        disabled={isLoading}
        register={register}
        errors={errors}
        label="description"
      />
    </div>
  );

  return (
    <Modal
      isOpen={profileModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      onClose={profileModal.onClose}
      actionLabel="Submit"
      body={body}
      title="Edit profile"
    />
  );
};

export default ChangeProfileModal;
