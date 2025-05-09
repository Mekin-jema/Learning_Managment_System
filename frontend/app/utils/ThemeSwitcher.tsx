"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";
const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer text-black "
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="cursor-pointer text-white"
          size={25}
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
