import { styles } from "@/app/style/style";

import { AddCircle } from "../sidebar/Icon";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}: Props) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handlePrerequisiteChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisite = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fiels for go to next!");
    }
  };

  return (
    <div className="w-[88%] m-auto mt-24 block">
      <div>
        <label htmlFor="email" className={`${styles.label}`}>
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefits"
            placeholder=" You will be able to build a full stack LMS platform... "
            className={`${styles.input}`}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
            value={benefit.title}
          />
        ))}
        <AddCircle
          style={{ margin: "18px 0px ", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label htmlFor="email" className={`${styles.label}`}>
          What are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Prerequisites"
            placeholder=" You will need basic knowledge of MERN stack... "
            className={`${styles.input}`}
            onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
            value={prerequisite.title}
          />
        ))}
        <AddCircle
          style={{ margin: "18px 0px ", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisite}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full xl:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] roundde mt-0"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full xl:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] roundde mt-0"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;