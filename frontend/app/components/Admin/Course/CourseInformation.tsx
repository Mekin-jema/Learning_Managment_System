import { styles } from "@/app/style/style";
import { useGetHeroDataQuery } from "@/Redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

/**
 * Component for displaying and editing course information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.courseInfo - The current course information.
 * @param {Function} props.setCourseInfo - Function to update the course information.
 * @param {number} props.active - The current active step in the form.
 * @param {Function} props.setActive - Function to update the active step.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @function handleSubmit
 * Handles the form submission event, prevents the default form submission behavior,
 * and advances to the next step in the form.
 *
 * @function handleFileChange
 * Handles the file input change event, reads the selected file as a data URL,
 * and updates the course information state with the file's data URL.
 *
 * @function handleDragOver
 * Handles the drag over event, prevents the default behavior to allow dropping,
 * and sets the dragging state to true.
 *
 * @function handleDragLeave
 * Handles the drag leave event, prevents the default behavior,
 * and sets the dragging state to false.
 *
 * @function handleDrop
 * Handles the drop event, prevents the default behavior, sets the dragging state to false,
 * reads the dropped file as a data URL, and updates the course information state with the file's data URL.
 */
const CourseInformation = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}: Props) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);
  const handleSubmit = (e: any) => {
    console.log(courseInfo);
    e.preventDefault();
    setActive(active + 1);
  };

  /**
   * Handles the file input change event, reads the selected file as a data URL,
   * and updates the course information state with the file's data URL.
   *
   * @param e - The file input change event.
   *
   * The `FileReader` object is used to read the contents of the file.
   * The `onload` event is triggered when the read operation is successfully completed.
   * The `readyState` property of `FileReader` can have the following values:
   * - 0 (EMPTY): No data has been loaded yet.
   * - 1 (LOADING): Data is currently being loaded.
   * - 2 (DONE): The entire read request has been completed.
   */
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    /**
     * Handles the drop event for a file input, preventing the default behavior,
     * stopping the dragging state, and reading the dropped file as a data URL.
     *
     * @param e - The drop event.
     *
     * The function does not use `readyState` because it leverages the `onload` event
     * of the FileReader, which ensures that the file reading process is complete
     * before updating the state with the file's data URL.
     */

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(courseInfo);
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor=""> Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with next 13 "
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write somthing amazing"
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29 "
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Estimated Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="price"
              placeholder="29 "
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Tag</label>

            <input
              type="text"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="price"
              placeholder="MERN,NEXT 13 ,SOcket io, Tailwind css ,LMS"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className={`${styles.input} bg-black text-white`}
              value={courseInfo.categories}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              {categories.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="w-[45%] ">
            <label htmlFor="" className={`${styles.label}`}>
              Course level
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="intermidiate"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[45%] ">
            <label htmlFor="" className={`${styles.label}`}>
              Demo Url
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="url"
              placeholder="https://www.google.com "
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={` w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center 
          ${dragging ? "bg-blue-500" : "bg-transparent"} `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white ">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full xl:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] mt-0 rounded cursor-pointer "
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
