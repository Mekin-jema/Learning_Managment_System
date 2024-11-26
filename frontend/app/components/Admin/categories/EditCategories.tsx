import {
  useGetHeroDataQuery,
  useUpdateLayoutMutation,
} from "@/Redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/style/style";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  // console.log(data);
  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

  const [categroies, setCategories] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prev: any) =>
      prev.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categroies[categroies.length - 1].title === "") {
      toast.error("Category title can not be empty");
    }
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {categroies.map((item: any) => {
            return (
              <div className="p-3">
                <div className="flex items-center w-full justify-center">
                  <input
                    type="text"
                    className={`${styles.input} !w-[unset] !border-none !text-[20px] `}
                    value={item.title}
                    onChange={(e) =>
                      handleCategoriesAdd(item._id, e.target.value)
                    }
                    placeholder="Enter category title..."
                  />
                  <AiOutlineDelete
                    className=" dark:text-white text-black text-[18px] cursor-pointer "
                    onClick={() =>
                      setCategories((prev: any) =>
                        prev.filter((pre: any) => pre._id !== item._id)
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default EditCategories;
