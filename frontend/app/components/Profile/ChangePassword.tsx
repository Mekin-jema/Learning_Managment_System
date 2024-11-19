import React, { useEffect } from "react";
import { styles } from "../../style/style";
import { useState } from "react";
import { useUpdatePasswordMutation } from "@/Redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const ChangePassword = ({ user }: Props) => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password is updated Successfully!");
    }
    if (error) {
      toast.error("Error");
    }

    return () => {};
  }, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updatePassword({ oldPassword, newPassword });
  };
  return (
    <div className=" w-full pl-6 md:pl-10">
      <form onSubmit={handleSubmit}>
        <div className="md:w-[50%] m-auto  block pb-4">
          <div className=" w-[100%] pt-2">
            <label className={`block pb-2 ${styles.label}`}>Old Password</label>
            <input
              type="password"
              className={`${styles.input}  mb-1 md:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] pt-2">
            <label className={`block pb-2 ${styles.label}`}>
              {" "}
              New Password
            </label>
            <input
              type="password"
              className={`${styles.input}  mb-1 md:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <input
            className={`w-full md:w-[250px] h-[40px] bg-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer
                `}
            type="submit"
            required
            value="Update passowrd"
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
