"use client";
import "../global.css";
const Crown = "/images/crown.svg";
const Qitt = "/images/qitt-img.jpg";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Terminal = "/images/terminal.svg";

import {
  FaChevronRight as Arrow,
  FaMicrochip,
  FaQuestionCircle,
  FaTerminal,
  FaWhatsapp,
} from "react-icons/fa";

import {
  MdScore as ScoreIcon,
  MdOutlineMoreVert as More,
} from "react-icons/md";

import { TiFlashOutline as FlashIcon } from "react-icons/ti";

import Selection from "./_components/quizSelection.js";

import { FaLaptopCode, FaDatabase, FaCodeBranch } from "react-icons/fa";

import { getUser, clearUser } from "./_utils/utils";

const Card = ({ icon, bg, title, subtitle, openSelection }) => {
  return (
    <div
      onClick={openSelection}
      className="card cursor-pointer flex items-center gap-3 drop-shadow-sm py-3 px-4 rounded mt-4 w-full bg-white h-[85px] select-none"
    >
      <div
        className={`${bg} w-16 rounded h-full flex justify-center items-center text-3xl`}
      >
        {icon}
      </div>

      <div className="flex flex-col">
        <p className="text-xl font-bold text-gray-800">{title}</p>

        <span className="flex gap-1 items-center">
          <FaQuestionCircle size={15} />
          <p className="text-sm text-gray-500" style={{ whiteSpace: "nowrap" }}>
            {subtitle}
          </p>
        </span>
      </div>
    </div>
  );
};

import { FaEnvelope, FaBuilding, FaSignOutAlt } from "react-icons/fa";
import { protectedHome } from "./_utils/protectRoute";
import toast from "react-hot-toast";
import Head from "next/head";

const ProfileModal = ({ onClose }) => {
  const user = getUser();
  const { photoURL, email, department } = user;

  function logOut() {
    const sure = confirm("Are you sure you want to logout ?");
    if (sure) {
      clearUser();
      window.location.reload();
    }
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-70">
      <div className="bg-white rounded-lg pb-7 overflow-hidden shadow-xl w-80">
        <div className="flex justify-end p-4  bg-opacity-20">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-4 text-center">
          <img
            src={photoURL || Qitt}
            alt="Profile Picture"
            className="w-32 h-32 mx-auto rounded-full"
          />

          <div className="mt-4">
            <p className="text-lg font-bold">{user.name}</p>
            <div className="flex items-center justify-center mt-2">
              <FaEnvelope className="text-gray-500 mr-2 " />
              <p className="text-gray-500">{email}</p>
            </div>
            <div className="flex items-center justify-center mt-1 px-1 rounded-md text-center justify-self-center capitalize">
              {/* <FaBuilding className="text-gray-500 mr-2" /> */}
              <p className="text-gray-500">{department}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4">
          <button
            onClick={logOut}
            className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            <FaSignOutAlt className="mr-1" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

function home() {
  const navigate = useRouter();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function openSelection() {
    navigate.push(`/quiz`);
  }

  function openPascal() {
    // toast('Hope you did well in your Exams 😍');
  }

  console.log(getUser());

  return (
    <>
        <Head>
            <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23808080' d='M512 256c0 141.385-114.615 256-256 256C114.615 512 0 397.385 0 256 0 114.615 0 0 114.615 0 256c0 84.44 41.22 159.071 104.565 204.921 13.178 7.521 24.209 1.172 24.209-14.535v-73.565c0-18.166 12.514-33.676 30.867-37.73C141.688 350.673 192 295.525 192 231.392V192h-32c-35.29 0-64-28.71-64-64v-32c0-17.673 14.327-32 32-32h16c8.837 0 16-7.163 16-16V80c0-8.837-7.163-16-16-16H96C78.327 64 64 78.327 64 96v24c0 53.051 43.481 96 96 96h32v-39.392c0-10.473 6.77-20.182 16.792-23.488C222.233 155.122 256 196.151 256 231.392v64.103c0 28.717-15.429 54.317-40.524 68.155-15.309 8.692-19.207 29.832-6.896 42.654C230.927 415.835 240 436.499 240 456v32c0 8.837 7.163 16 16 16h32c8.837 0 16-7.163 16-16v-32c0-17.673 14.327-32 32-32h16c17.673 0 32-14.327 32-32v-16c0-8.837-7.163-16-16-16h-48V264h48c35.29 0 64 28.71 64 64v32c0 17.673-14.327 32-32 32h-16c-8.837 0-16 7.163-16 16v16c0 35.29 28.71 64 64 64h32c17.673 0 32-14.327 32-32v-24c0-66.274-53.726-120-120-120h-16v-48c0-17.673-14.327-32-32-32h-32V80c0-17.673-14.327-32-32-32h-16c-8.837 0-16 7.163-16 16v32c0 17.673 14.327 32 32 32h32v39.392c0 26.646 11.044 52.402 29.6 70.608C289.185 355.124 288 364.759 288 374.743v73.564c0 15.71 11.02 22.08 24.208 14.535C470.78 415.071 512 340.44 512 256z'/%3E%3C/svg%3E" />
            
            <title>CBT BOX - C.Sc Help Group (Built by Joshua Boyi)</title>
        </Head>
      <Selection isOpen={open} onClose={() => setOpen(false)} />
      <div className="bg-gray-100 sm:w-2/4 mx-auto h-[100vh] flex flex-col gap-y-4 pb-3">
        <header class="w-full relative h-48 bg-gradient-to-r from-green-600 to-green-300">
          <div className="nav flex  justify-between px-5 items-center mt-5">
            <div>
              <h1 className="text-3xl text-gray-50 font-bold">Let's CBT</h1>
              <p className="text-gray-50 text-sm">And be the first</p>
            </div>

            {/* Profile Icon */}
            <div className="rounded-full w-12 h-12" onClick={openModal}>
              <img
                src={getUser()?.photoURL || Qitt}
                className="w-12 h-12 rounded-full"
              />
            </div>

            {isModalOpen && <ProfileModal onClose={closeModal} />}
          </div>

          {/* Name Card */}
          <div class="bg-im bg-opacity-1 drop-shadow-lg px-2 py-3 h-44 w-[92%] bg-white mx-auto mt-7 rounded-md flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-center text-black">
              @{getUser()?.name}
            </h3>
            <span class="text-sm text-center text-gray-500">
              Your exam success means a lot to us 😊
            </span>

            <Link
              href="/scoreboard"
              className="mt-5 flex mx-auto items-center px-4 gap-x-2 py-2 font-semibold rounded-md bg-green-500 text-white w-fit border-2 border-green-600"
            >
              {/* <img src={Crown} className="w-5 h-5" alt="Crown Icon" /> */}
              <p>🏆</p>
              Scoreboard
            </Link>
          </div>
        </header>

        <section className="mt-28 px-5 mb-9 bg-gray-100">
          <h4 className="font-bold text-lg">For You</h4>

          <div className="quiz-card-box  h-full">
            <Card
              icon={<FaTerminal className="text-yellow-600" />}
              bg="bg-yellow-100"
              title="CSC 280 (Fortran)"
              subtitle="Good number of questions"
              openSelection={openSelection}
            />

            {getUser()
              ?.department.toLowerCase()
              .trim()
              .startsWith("computer") && (
              <Card
                icon={<FaMicrochip className="text-blue-600" />}
                bg="bg-blue-100"
                title="CSC 288 (Pascal)"
                subtitle="Exam Completed ✅🥳"
                openSelection={openPascal}
              />
            )}
          </div>
        </section>

        <p className="text-center text-sm text-gray-500 px-3 rounded-lg">
          Made with <span className="text-red-500">&hearts;</span> by <br />
          <b className="text-gray-800">Joshua Boyi</b> &{" "}
          <b className="text-gray-800">Chisom Joseph</b> <br />
          <i className="text-gray-600">Courtesy: CSC Year 2</i>
        </p>

        <div class="absolute bottom-2/4 right-2 text-xs border-2 border-green-500 rounded bg-green-100 p-2">
          <a
            href="https://wa.me/+2349034954069"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="relative text-center">
              We 😍 Ur <br /> Feedbacks{" "}
              <FaWhatsapp
                class="absolute right-1/3 -bottom-5 text-green-700"
                size={25}
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default protectedHome(home)
