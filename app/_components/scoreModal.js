import React from "react";
import { FaCaretDown, FaClipboard } from 'react-icons/fa';
import { GrScorecard } from "react-icons/gr";
import { MdOutlineGrade } from "react-icons/md";

function DisplayScoreModal({ data, onClose }) {
  const { results, score, answeredQuestions, totalQuestions } = data;

  const getEncouragementMessage = () => {
    if (answeredQuestions === 0) {
      return "🤔 You didn't answer any questions. Keep going!";
    } else if (score === totalQuestions) {
      return "🎉 Perfect score! You're a genius!";
    } else if (score === 0) {
      return "😔 Oh no! Better luck next time!";
    } else if (score >= totalQuestions / 2) {
      return "👍 Great job! You're doing well!";
    } else if (score >= totalQuestions / 4) {
      return "🙂 Don't worry! Keep practicing!";
    } else {
      return "😓 Keep going! You'll improve with practice!";
    }
  };

   // Function to calculate grade based on score
   const getGrade = () => {
    if (score >= totalQuestions * 0.7) {
      return "A";
    } else if (score >= totalQuestions * 0.6) {
      return "B";
    } else if (score >= totalQuestions * 0.5) {
      return "C";
    } else if (score >= totalQuestions * 0.45) {
      return "D";
    } else if (score >= totalQuestions * 0.4) {
      return "E";
    } else {
      return "F";
    }
  };

  return (
    <div className="fixed inset-0 h-screen z-50 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none">
      <div className="fixed inset-0 bg-black opacity-80"></div>
      <div className="relative w-auto max-w-md mx-auto my-6 h-full">
        {/*content*/}
        <div className="border-0  shadow-lg relative flex flex-col w-full bg-white bg-opacity-100 outline-none   focus:outline-none overflow-auto">
          {/*header*/}  
          <div className="px-5 pt-5 pb-3 border-b border-solid border-gray-500 rounded-t">
            <div className="flex items-start justify-between relative">
              <h3 className="text-3xl w-full font-semibold flex justify-center items-center gap-x-3">
                Results 
                {/* <span>📋</span> */}
              </h3>
            
              <button className="absolute right-2 text-2xl font-bold text-red-600 " onClick={onClose}>
                ×
              </button>
            </div>
            {/* Second Text */}
            {/* <p className="capitalize text-xs text-center mt-1 opacity-80">for your (CSC280) <b>FORTRAN CBT</b> Practice</p> */}
          </div>
          {/*body*/}
          <div className="relative px-6 pt-6 flex-auto shadow-md">
            <p className=" text-gray-700 text-sm font-bold leading-relaxed">
              You answered <b className="text-green-900">{answeredQuestions}</b> out of <b className="text-green-900">{totalQuestions}</b> questions.
            </p>
            
            <div className="flex items-center gap-x-6">
                <p className="my-5 text-blueGray-500 text-lg leading-relaxed">
                    <span className="text-lg flex items-center">
                      <b className="flex items-center gap-x-2"><GrScorecard className="text-green-800"/> Scores :</b>&nbsp; {score}/{totalQuestions}</span> 
                </p>

                <p className="text-lg flex items-center"> 
                  <b className="flex items-center gap-x-2"><MdOutlineGrade className="text-yellow-500"/> Grade : </b> 
                  <span className="text-xl"> &nbsp;{getGrade()}</span>
                </p>

            </div>
               
            <p className="mt-4 text-gray-600 text-lg leading-normal">
                {getEncouragementMessage()}
            </p>

            {/* Failed Questions */}
            <section className="mt-6 ">
              <div className="px-2 py-3 font-semibold bg-green-600 flex justify-between items-center text-white "> 
              View Incorrect's ({results .filter(data => data.isCorrect === false).length})
              <span><FaCaretDown className="text-red-950"/></span>
             </div>

             {

            results
              .filter(data => data.isCorrect === false)
              .map((res, index) => (
                <div key={index} className="bg-gray-100 p-4 mb-4 rounded-md">
                  <p className="font-bold">{res.question}</p>
                  <div className="flex flex-col mt-2">
                    <p className="text-green-600">{res.correctAnswer}</p>
                    <p className="text-red-300  line-through">{res.userAnswers}</p>
                  </div>
                </div>
              ))
          }


            </section>


          </div>
          {/*footer*/}
          <div className="flex items-center justify-center py-3 ">
            <button
              className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none "
              type="button"
              onClick={onClose}>
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayScoreModal;
