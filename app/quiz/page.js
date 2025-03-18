"use client";
import "../../global.css";
import React, { useState, useEffect, Suspense } from "react";
import { MdClose } from "react-icons/md";
import ScoreModal from "../_components/scoreModal";
import { FaChevronLeft as Right } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import EndQuizModal from "../_components/endQuizModal";
import axios from "axios";
import { updateScoreBoard } from "../_utils/utils";
import CarbonEmbed from "../_components/CarbonEmbed";
import { useRouter, useSearchParams } from "next/navigation";
import { protectedHome } from "app/_utils/protectRoute";

const baseUrl = "/api/quiz";

function LoaderText() {
  const [loadingText, setLoadingText] = useState("Loading...");

  const updateLoadingText = () => {
    const texts = [
      "🤔 Are you ready for this test?",
      "🏋️‍♂️ Let's arrange the questions.",
      "🍀 Wish you Good luck in your Exams!",
      "🚀 Hold tight, we're almost there!",
      "🎉 Exciting things are coming your way!",
      "🕒 Time to shine! Your success awaits.",
      "🎶 Grooving while we load your data...",
      "💡 Unlocking your potential, one load at a time!",
      "📱 Optimizing for best experience!",
      "💻 Programming the future...",
      "🔍 Searching for the best results...",
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    setLoadingText(texts[randomIndex]);
  };

  useEffect(() => {
    const intervalId = setInterval(updateLoadingText, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="lds-dual-ring"></div>
      <p className="text-center transition duration-500 ease-in-out transform hover:scale-110">
        {loadingText}
      </p>
    </div>
  );
}

const Question = ({
  course,
  question,
  options,
  image,
  code,
  id,
  idx,
  setAnswers,
  answers,
}) => {
  const [ans, setAns] = useState(answers[id] || null);

  function handleClick({ ids, qid, answer }) {
    setAns(ids);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [qid]: options[parseInt(answer)],
    }));
  }

  return (
    <div className="w-full">
      {code && (
        <div className="mt-8 w-full flex justify-start">
          <CarbonEmbed
            code={code}
            language={course === "csc280" ? "fortran" : "pascal"}
          />
        </div>
      )}

      {image && (
        <img className="w-20 mt-4" src={image} alt="Description of the image" />
      )}

      <div className="mt-3 font-semibold flex items-center gap-1">
        <h2>Q{idx + 1}. </h2>
        <p className="mt-3 font-semibold flex items-center mb-1">{question}</p>
      </div>

      {options.map((opt, ids) => (
        <label key={ids} className="ml-2 flex gap-x-4 font-light">
          <input
            value={ids}
            id={ids}
            checked={ids == ans}
            onChange={({ target }) =>
              handleClick({ ids, qid: id, answer: target.value })
            }
            type="radio"
            className="mr-1"
          />
          <p>{opt.split(" ").slice(1).join(" ")}</p>
        </label>
      ))}
    </div>
  );
};

const QuizScreen = ({ className }) => {
  const navigate = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState("");

  useEffect(() => {
    setLoading(true)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      setCourse(params.get("course") || "Not specified");
      setLoading(false)
    }
  }, []);

  const time = 30;
  const numberOfQuestions = 50;

  const initialTimeInSeconds = time * 60;
  const [timer, setTime] = useState(initialTimeInSeconds);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) =>
        prevTime > 0
          ? prevTime - 1
          : (() => {
              submitQuiz();
              clearInterval(timerInterval);
              return 0;
            })()
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  const formattedTime = new Date(timer * 1000).toISOString().substr(14, 5);

  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState({});

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await axios.get(baseUrl, {
          params: {
            subject: course,
            numberOfQuestions: numberOfQuestions,
          },
        });
        console.log(response.data);
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    getQuestions();
  }, [course, numberOfQuestions]);

  const leaveQuiz = (e) => {
    e.preventDefault();
    return navigate.push("/", { state: { replace: "/" } });
  };

  useEffect(() => {
    toast.success("Welcome to CBT-BOX practice.", {
      icon: "🥳",
      duration: 4000,
    });
  }, []);

  const closeModal = () => {
    setSubmitted(false);
  };

  const submitQuiz = async () => {
    try {
      const submit = await axios.post(baseUrl, {
        subject: course,
        totalQuestions: numberOfQuestions,
        answers,
      });
      console.log(submit.data);
      setResult(submit.data);
      setSubmitted(true);

      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const score = submit.data.score;
      updateScoreBoard(currentTime, score, course);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const endQuiz = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    return navigate.push("/", { replace: "/" });
  };

  if (loading){
    return <LoaderText/>
  }

  return (
    <Suspense fallback={<LoaderText />}>
      <main className="w-full">
        <>
          <nav className="fixed top-0 right-0 z-20 w-full h-16 flex justify-between items-center bg-green-700 px-2 text-gray-100">
            <div className="flex gap-x-5 items-center h-full ">
              <button onClick={leaveQuiz}>
                <Right className="text-gray-100" />
              </button>

              <div className="flex flex-col justify-center w-full px-2 bg-blue-1000 h-full">
                <p className="text-2xl sm:text-3xl font-extrabold capitalize">
                  {course}
                </p>
                <div className="text-sm font-semibold">
                  {Object.keys(answers).length} out of {numberOfQuestions}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm">Time Remaining</p>
              <p className="font-bold">{formattedTime} mins</p>
            </div>
          </nav>

          <section className="w-full relative h-full overflow-y-auto">
            <section className="w-full flex justify-center items-center mt-16">
              <div className="w-full sm:w-[80%] px-3 sm:px-0 pb-4 pt-2 bg-blue-00 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {questions?.map((item, idx) => (
                  <Question
                    key={item.id}
                    course={course}
                    question={item.question}
                    options={item.options}
                    image={item?.image}
                    code={item?.code_snippet || ""}
                    id={item.id}
                    idx={idx}
                    setAnswers={setAnswers}
                    answers={answers}
                  />
                ))}
              </div>
            </section>

            <div className="flex flex-col p-2 h-full gap-2 bg-yellow-40 my-4 w-full items-center">
              <button
                onClick={endQuiz}
                className="w-[40%] h-16 bg-red-600 hover:bg-red-400 text-white"
              >
                Submit
              </button>
              <p className="bg-blue-00 text-sm flex justify-start items-start text-center font-light underline">
                By clicking this you agree to end your practice session
              </p>
            </div>
          </section>
        </>

        {modalVisible && (
          <EndQuizModal
            onClose={() => setModalVisible(false)}
            onSubmit={submitQuiz}
          />
        )}

        {submitted && <ScoreModal data={result} onClose={handleCloseModal} />}

        <Toaster />
      </main>{" "}
    </Suspense>
  );
};

export default protectedHome(QuizScreen);
