"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { styles } from "../../style/style";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useLoginMutation } from "@/Redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("invalid email")
    .required("Please enter  your email"),
  password: Yup.string().required("Please enter your passowrd").min(6),
  cpassowrd: Yup.string().oneOf([Yup.ref("passowrd")], "Passowrd is not mutch"),
});

const Login = ({ setRoute, setOpen }: Props) => {
  const [show, setShow] = useState(false);

  //
  const [login, { isSuccess, isError, error, data }] = useLoginMutation();

  //

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      // console.log(email, password);
      const data = { email, password };
      await login(data);
    },
  });
  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
    }
    if (isError && error) {
      console.log("error", error, "isError", isError);
      if ("data" in error) {
        const errorData = error as any;
        if (errorData.data.message) {
          toast.error(errorData.data.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      }
    }
  }, [isSuccess, isError, error]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className={`${styles.title}`}>Login with E-Learning</h2>
      <form onSubmit={handleSubmit} className="p-5  ">
        <label className={`${styles.label}`} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          id="email"
          placeholder="mekinjemal999@gmail.com"
          onChange={handleChange}
          className={`${
            errors.password && touched.email && "border-red-500 "
          } ${styles.input}`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5  relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your password
          </label>
          <div className="relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              id="password"
              placeholder="qwerty1234"
              onChange={handleChange}
              className={`${
                errors.password && touched.password && "border-red-500 "
              } ${styles.input} `}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white ">
          Or Join with
        </h5>
        <div className="flex items-center justify-center my-3  ">
          <FcGoogle
            size={30}
            className="cursor-pointer ml-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            onClick={() => signIn("github")}
            className="cursor-pointer ml-2 text-black dark:text-white"
            size={30}
          />
        </div>

        <br />
        <h5 className=" flex justify-center  pt-4 font-Poppins text-[14px]  text-black dark:text-white">
          Not have any account
          <span
            className="text-[#2190ff] pl-1 cursor-pointer "
            onClick={() => setRoute("Sign-up")}
          >
            Sign Up
          </span>
        </h5>
      </form>
      <br />
    </motion.div>
  );
};

export default Login;
