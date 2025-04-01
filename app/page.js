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
  FaPython,
  FaQuestionCircle,
  FaTerminal,
  FaWhatsapp,
  FaWindows,
} from "react-icons/fa";

import {
  MdScore as ScoreIcon,
  MdOutlineMoreVert as More,
} from "react-icons/md";

import { TiFlashOutline as FlashIcon } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
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
            <div className="flex items-center justify-center mt-1 px-1 rounded-md text-center justify-self-center capitalize">
              {/* <FaBuilding className="text-gray-500 mr-2" /> */}
              <p className="text-gray-500">Level : {user?.level}</p>
            </div>
          </div>
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
    navigate.push(`/quiz?course=csc280`);
  }

  function openVB2() {
    navigate.push(`/quiz?course=vbnet2`);
  }

  function openPython() {
    navigate.push(`/quiz?course=python`);
  }

  function openPascal() {
    navigate.push(`/quiz?course=vbnet`);
  }

  console.log(getUser());

  function logOut() {
    const sure = confirm("Are you sure you want to logout ?");
    if (sure) {
      clearUser();
      window.location.reload();
    }
  }

  return (
    <>
      <Selection isOpen={open} onClose={() => setOpen(false)} />
      <div className="bg-gray-100 sm:w-2/4 mx-auto h-[100vh] flex flex-col gap-y-4 pb-3 w-full">
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

        <section className="mt-28 px-5 mb-5 bg-gray-100">
          <h4 className="font-bold text-lg">For You</h4>

          <div className="quiz-card-box  h-full">
            {getUser()?.level === "200" && (
              <Card
                icon={<FaTerminal className="text-yellow-600" />}
                bg="bg-yellow-100"
                title="CSC 280 (Fortran)"
                subtitle="Practice Fortran with lots of Questions"
                openSelection={openSelection}
              />
            )}

            {getUser()?.level === "200" && (
              <Card
                icon={<FaWindows className="text-green-600" />}
                bg="bg-green-100"
                title="VB.NET (200Lvl)"
                subtitle="Master VB.NET with Interactive CBT"
                openSelection={openVB2}
              />
            )}

            {getUser()?.level === "200" && (
              <Card
                icon={<FaPython className="text-gray-900" />}
                bg="bg-indigo-100"
                title="Python "
                subtitle="Ace Your Python Exams with CBT"
                openSelection={openPython}
              />
            )}

            {getUser()?.level === "100" && (
              <Card
                icon={<FaMicrochip className="text-blue-600" />}
                bg="bg-blue-100"
                title="Vb.Net"
                subtitle="Exam Success 🥳"
                openSelection={openPascal}
              />
            )}
          </div>
        </section>

        {/* <p className="text-center text-sm text-gray-500 px-3 rounded-lg">
          Made with <span className="text-red-500 text-xl mb-2">&hearts;</span>{" "}
          by <br />
          <b className="text-gray-800">Joshua Boyi</b> &{" "}
          <b className="text-gray-800">Chisom Joseph</b> <br />
          <i className="text-gray-600">Courtesy: CSC Year 3</i>
        </p> */}
        <div className="text-md text-gray-700 w-[75%] sm:w-[60%] mx-auto bgi-blue-500">
          <p className="mb-2">
            Want an easier uni life? Follow 
            <Link target="blank"
              href="https://instagram.com/useqitt"
              className="text-green-600 font-semibold hover:underline"
            >
              &nbsp;@useqitt
            </Link>{" "}
            for more!
          </p>
          <p>Made with ❤️ by <b>Team Qitt</b>  <b>-</b>  <b>(</b>Courtesy: CSC Yr3<b>)</b></p>
        </div>

        <div className="flex justify-center pb-4 w-full">
          <button
            onClick={logOut}
            className="flex items-center bg-red-500 text-red-50 px-4 py-2 rounded-md hover:bg-red-400 focus:outline-none"
          >
            <FiLogOut className="mr-1" />
            Logout
          </button>
        </div>

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

export default protectedHome(home);
