import {
  useGetHeroDataQuery,
  useUpdateLayoutMutation,
} from "@/Redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/style/style";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoMdAddCircle } from "react-icons/io";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  console.log(data);
  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    if (data) {
      setCategories(data.layout?.categories);
    }
    if (isSuccess) {
      refetch();
      toast.success("Categoies updated successfully");
    }
    if (error) {
      toast.error("Error in update the categories");
    }
  }, [data, error, isSuccess]);

  const handleCategoryChange = (index: number, value: any) => {
    const updateCategories = categories.map((category: any, i: any) =>
      i === index ? { ...category, title: value } : category
    );
    setCategories(updateCategories);
  };

  const addNewCategoryFeild = () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories([...categories, { title: "" }]); // Ensure a unique `_id` for each new category
    }
  };

  const areCategoriesUnchanged = (
    orginalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(orginalCategories) === JSON.stringify(newCategories);
  };
  const isAnyCategorieEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };
  const EditCategoryLayout = async () => {
    console.log(categories);
    console.log(areCategoriesUnchanged(data.layout?.categories, categories));
    console.log(isAnyCategorieEmpty(categories));
    if (
      !areCategoriesUnchanged(data.layout?.categories, categories) &&
      !isAnyCategorieEmpty(categories)
    ) {
      await updateLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-[120px] text-center flex flex-col  items-center h-screen">
            <h1 className={`${styles.title}`}>All Categories</h1>
            {categories.map((item: any, index: number) => {
              return (
                <div className="p-3">
                  <div className="flex items-center w-full justify-center">
                    <input
                      type="text"
                      className={`${styles.input} !w-[unset] !border-none !text-[20px] `}
                      value={item.title}
                      key={index}
                      onChange={(e) =>
                        handleCategoryChange(index, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className=" dark:text-white text-black text-[18px] cursor-pointer "
                      onClick={() => {
                        setCategories((prev: any) =>
                          prev.filter((pre: any) => pre._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}

            <br />
            <br />
            <IoMdAddCircle
              className="dark:text-white text-black text-[25px] cursor-pointer items-center text-center"
              onClick={addNewCategoryFeild}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px]  !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
       ${
         areCategoriesUnchanged(data?.layout?.categories, categories) ||
         isAnyCategorieEmpty(categories)
           ? "!cursor-not-allowed"
           : " !cursor-pointer bg-[#42d383] "
       }
     !rounded absolute bottom-12 right-12 `}
            onClick={
              areCategoriesUnchanged(data?.layout?.categories, categories) ||
              isAnyCategorieEmpty(categories)
                ? () => {}
                : EditCategoryLayout
            }
          >
            Update
          </div>
        </>
      )}
    </div>
  );
};

export default EditCategories;
