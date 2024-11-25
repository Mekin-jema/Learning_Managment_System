import { styles } from "@/app/style/style";
import {
  useGetHeroDataQuery,
  useUpdateLayoutMutation,
} from "@/Redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title || "");
      setImage(data?.layout?.banner?.image?.url || "");
      setSubTitle(data?.layout?.banner?.subTitle || "");
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero data updated successfully");
    }
    if (error) {
      toast.error("Failed to update hero data");
    }
  }, [data, isSuccess, error]);

  const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await updateLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-between p-4 ">
      {/* Left Section: Image */}
      <div className="relative group w-3/4 flex items-center justify-center  rounded-lg shadow-md p-4">
        {/* Image Display */}
        <img
          src={image || "/placeholder.jpg"}
          alt="Hero Banner"
          className="w-[400px] h-[400px] rounded-full object-cover border border-gray-200 shadow-sm"
        />

        {/* Hidden File Input */}
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleUpdateImage}
          className="hidden"
        />

        {/* Label for File Input */}
        <label
          htmlFor="banner"
          className="absolute top-40 right-40 bg-gray-100 border text-black dark:bg-gray-800 dark:text-white dark:border-gray-800 border-gray-200 rounded-md px-4 py-2 cursor-pointer transition duration-300 ease-in-out group-hover:bg-gray-200 group-hover:text-black group-hover:border-gray-300"
        >
          <AiOutlineCamera className="inline-block mr-2 text-lg" />
          Update Image
        </label>
      </div>

      {/* Right Section: Content */}
      <div className="lg:w-[60%] flex flex-col items-center lg:mt-0 text-center lg:text-left mt-[150px] w-full bg-transparent">
        <textarea
          className="dark:text-white text-[#000000c7] text-[30px] lg:text-[60px] 4xl:text-[70px] font-Poppins px-3 py-2 resize-none w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition"
          placeholder="Improve Your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={4}
        />
        <br />
        <textarea
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="We have 48k+ online courses and 500k+ registered students. Find your desired course from"
          className="dark:text-white text-[#000000c7] text-[20px] lg:text-[30px] 4xl:text-[40px] font-Poppins px-3 py-2 w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition"
        />
        <br />
        <div
          className={`${
            styles.button
          } !w-[100px] !h-[40px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34] rounded-md transition-colors duration-300 ease-in-out ${
            data?.layout?.banner?.title === title &&
            data?.layout?.banner?.subTitle === subTitle &&
            data?.layout?.banner?.image?.url === image
              ? "!cursor-not-allowed"
              : "!cursor-pointer !bg-[#42d383] hover:bg-[#36c072] transition"
          } !rounded-md absolute bottom-12 right-12 flex items-center justify-center`}
          onClick={
            data?.layout?.banner?.title === title &&
            data?.layout?.banner?.subTitle === subTitle &&
            data?.layout?.banner?.image?.url === image
              ? undefined
              : handleEdit
          }
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default EditHero;
