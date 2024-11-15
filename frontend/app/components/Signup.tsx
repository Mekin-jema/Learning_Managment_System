"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { styles } from "../style/style";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("invalid email")
    .required("Please enter  your email"),
  password: Yup.string().required("Please enter your passowrd").min(6),
  cpassowrd: Yup.string().oneOf([Yup.ref("passowrd")], "Passowrd is not mutch"),
});

const SignUp = ({ setRoute }: Props) => {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password, name }) => {
      console.log(email, password, name);
    },
  });
  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className={`${styles.title}`}>Register with E-Learning</h2>
      <form onSubmit={handleSubmit} className="p-5  ">
        <label className={`${styles.label}`} htmlFor="name">
          Enter your Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          id="name"
          placeholder="Mekin Jemal"
          onChange={handleChange}
          className={`${errors.name && touched.name && "border-red-500 "} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
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
              id="Password"
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
          <FcGoogle size={30} className="cursor-pointer ml-2" />
          <AiFillGithub className="cursor-pointer ml-2" />
        </div>
        <br />
        <h5 className=" flex justify-center pt-4 font-Poppins text-[14px]">
          have any account
          <span
            className="text-[#2190ff] pl-1 cursor-pointer "
            onClick={() => setRoute("Login")}
          >
            Login
          </span>
        </h5>
      </form>
      <br />
    </motion.div>
  );
};

export default SignUp;
