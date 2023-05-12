"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "ufa5bp0v";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [dataImg, setDataImg] = useState<{ name: string }[]>([]);

  const handleUpload = useCallback(
    (result: any) => {
      const url = result.info.secure_url;
      const newItem = {
        name: imageUrl,
      };
      setDataImg((prevDataLis) => [...prevDataLis, newItem]);
      setImageUrl(url);
      onChange([...value, url]);
    },
    [onChange, value]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 4,
      }}
    >
      {({ open }) => {
        return (
          <div className="flex flex-col gap-y-4">
            <div
              onClick={() => open?.()}
              className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
              {value.map((url) => (
                <Image
                  width={200}
                  height={300}
                  src={url}
                  alt="House"
                  key={url}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
