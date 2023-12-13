"use client";

import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
//import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div
      className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
      <CldUploadButton
        options={{
          maxFiles: 1,
          sources: ["local"],
          language: "en",
          text: {
            en: {
              or: "Ya da ",
              local: {
                browse: "Gözat",
                dd_title_single: "Dosyayı buraya sürükle bırak",
                dd_title_multi: "Dosyayı buraya sürükle bırak",
                drop_title_single: "Dosyayı buraya sürükle bırak",
                drop_title_multiple: "Dosyayı buraya sürükle bırak",
              },
              menu: {
                files: "Dosyalarım"
              },
            },
          },
        }}
        onUpload={handleUpload}
        uploadPreset="qfuplboa"
      >
        <HiPhoto size={30} className="text-green-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Mesaj gönder..."
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-green-500 
            cursor-pointer 
            hover:bg-green-600 
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
