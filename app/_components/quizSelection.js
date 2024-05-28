import React, { useState } from 'react';
import Link from 'next/link'
import { FaCaretRight } from 'react-icons/fa'; 

export default function Selection({ isOpen, onClose }) {
  const [time, setTime] = useState(10);
  const [course, setCourse] = useState('csc280');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const closeModal = () => {
    setTime(10);
    setCourse('csc280');
    setNumberOfQuestions(10);
    onClose();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-800 opacity-75" ></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lgs text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              
              <div className="bg-gray-100 px-4 py-4 flex items-center drop-shadow-sm border-b-2 border-b-gray-100 justify-between">
              <h2 class="text-lg font-semibold text-gray-800 text-i">Let's Dive into the Quiz ! 🎉</h2>
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-800 hover:text-gray-300 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-4">
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-2">Time:</span>
                      <select
                        value={time}
                        onChange={({ target }) => setTime(target.value)}
                        className="bg-transparent flex focus:outline-none">
                        <option value={10}>10 mins</option>
                        <option value={20}>20 mins</option>
                        <option value={30}>30 mins</option>
                        <option value={40}>40 mins</option>
                        <option value={50}>50 mins</option>
                        <option value={0}>No Time</option>
                      </select>
                    </div>

                   
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-2">No Of Questions:</span>
                      <select
                        value={numberOfQuestions}
                        onChange={({ target }) => setNumberOfQuestions(target.value)}
                        className="bg-transparent flex focus:outline-none">
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                        <option value={50}>50</option>
                        <option value={60}>60</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Link
                  to={`/practice/${course}/${time}/${numberOfQuestions}`}
                  onClick={closeModal}
                  className="mt-5 text-lg w-full py-4 gap-2 text-white flex items-center font-semibold focus:text-white hover:text-gray-100 rounded justify-center bg-green-800 border-2 border-green-700">
                  <p>Start </p><FaCaretRight size={25}/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
