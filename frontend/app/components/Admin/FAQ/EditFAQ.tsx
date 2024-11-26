import { styles } from "@/app/style/style";
import {
  useGetHeroDataQuery,
  useUpdateLayoutMutation,
} from "@/Redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFAQ = (props: Props) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  // console.log(data);
  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq || []);
    }
    if (isSuccess) {
      refetch();
      toast.success("FAQ Updated Successfully");
    }
    if (error) {
      toast.error("Erro While updating the FAQ");
    }
  }, [data, error, isSuccess]);

  const toggleQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };
  const newFaqHandler = () => {
    setQuestions([...questions, { questions: "", answer: "" }]);
  };

  // function to chekck if the FAQ array are Unchaned
  const areQuestionsUnchanged = (
    orginalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(orginalQuestions) === JSON.stringify(newQuestions);
  };
  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };
  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await updateLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" w-[90%] lg:w-[80%]  m-auto mt-[120px]  h-screen">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions?.map((q: any) => (
                <div
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-2`}
                  key={q._id}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black 
                justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        type="text"
                        className={`${styles.input} border-none`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={"Add Your Question"}
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <AiOutlineMinus height={6} width={6} />
                        ) : (
                          <AiOutlinePlus height={6} width={6} />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2">
                      <input
                        type="text"
                        className={`${styles.input} border-none`}
                        value={q.answer}
                        onChange={(e) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder={"Add your answer...."}
                      />
                      <span className=" ml-6 flex-shrink-0 ">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px]  cursor-pointer"
                          onClick={() => {
                            setQuestions((prev) =>
                              prev.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px]  !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
       ${
         areQuestionsUnchanged(data?.layout.faq, questions) ||
         isAnyQuestionEmpty(questions)
           ? "!cursor-not-allowed"
           : "!cursor-pointer bg-[#42d383] "
       }
     !rounded absolute bottom-12 right-12 `}
            onClick={
              areQuestionsUnchanged(data?.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Update
          </div>
        </div>
      )}
    </>
  );
};

export default EditFAQ;
