"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatars from "../../../public/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../style/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/Redux/features/user/userApi";
import { useLogoutUserQuery } from "@/Redux/features/auth/authApi";
import toast from "react-hot-toast";
type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo = ({ avatar, user }: Props) => {
  const [name, setName] = useState(user?.name || "");
  const [loadUser, setLoadUser] = useState(false);
  const [
    editProfile,
    { error: editProfileError, isSuccess: editProfileSuccess },
  ] = useEditProfileMutation();
  const {} = useLogoutUserQuery(undefined, { skip: loadUser ? false : true }); //logout user
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  // update avatar

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;

        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     //   console.log("success");
  //     setLoadUser(true);
  //   }
  //   if (error) {
  //     console.log("error", error);
  //   }
  // }, [isSuccess, error]);

  useEffect(() => {
    if (isSuccess || editProfileSuccess) {
      setLoadUser(true);
    }
    if (error || editProfileError) {
      console.log(editProfileError, error);
    }
    if (editProfileSuccess) {
      toast.success("Profile updated successfully");
    }
  }, [editProfileSuccess, editProfileError, isSuccess, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "")
      await editProfile({
        name: name,
      });
    // console.log(first)
  };

  return (
    <>
      <div className=" w-full flex justify-center">
        <div className=" relative">
          <Image
            src={user?.avatar || avatar ? user.avatar.url || avatar : avatars}
            alt="avatar"
            width={20}
            height={20}
            className="w-[120px] h-[120px] border-[3px] border-[#37a39a] cursor-pointer rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg ,image/webp"
          />
          <label htmlFor="avatar">
            <div
              className="w-[30px] h-[30px] bg-slate-900  absolute roudfull
             bottom-2 right-2 flex items-center justify-center cursor-pointer rounded-full"
            >
              <AiOutlineCamera size={20} className=" z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className=" w-full pl-6 md:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[50%] m-auto  block pb-4">
            <div className="w-[100%]">
              <label className={`block pb-2 ${styles.label}`}>Full Name</label>
              <input
                type="text"
                className={`${styles.input}`}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className=" w-[100%] pt-2">
              <label className={`block pb-2 ${styles.label}`}>
                Email address
              </label>
              <input
                type="text"
                readOnly
                className={`${styles.input}  mb-1 md:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full md:w-[250px] h-[40px] bg-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer
                `}
              type="submit"
              required
              value="Update Profile"
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default ProfileInfo;
