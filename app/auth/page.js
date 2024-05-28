"use client";
import "../../global.css";
import React, { useState } from 'react';
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../_components/Loader';
import axios from 'axios';
const Level1 = '/images/level3.svg';
const Check = '/images/check-svgrepo-com.png';
const Email = '/images/gcap.svg';
const Google = '/images/google-img.png';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { courseShortForms, addUser } from '../_utils/utils';
import firebase from '../_libs/firebase';
import { TiThMenu } from 'react-icons/ti';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { protectedAuth } from "../_utils/protectRoute";


function Auth() {
  const navigate = useRouter()
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);


  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    if (department === '') {
      toast.error('Please select a department.');
      return;
    }

    setLoading(true);

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log('User signed in successfully:', user.displayName);

        addUser(user.displayName, user.uid, user.email, department, '200', user.photoURL);

        let url = 'https://api.sheety.co/766cbc7853811a71e0a5dd0daf78e2e8/quizlerUsers/sheet1';
        let body = {
          sheet1: {
            name: user.displayName,
            userId: user.uid,
            email: user.email,
            department: department,
            level: '200',
            photoUrl: user.photoURL
          }
        };

        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (!response.ok) {
              toast.error('Network Error :)')
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // Handle response data
            console.log(data.sheet1);
          })
          .catch(error => {
            // Handle error
            console.error('Error:', error);
            toast.error(error)
          });

        // Redirect to desired page after sign-in
        navigate.push('/');
      })
      .catch((error) => {
        console.error('Error signing in:', error.message);
      });
  };

  return (
    <div className='bg-white min-h-screen  overflow-auto'>
    <header className='w-full mb-3'>
      <nav className='w-full h-20  bg-green-950 flex justify-between items-center px-3'>
        <p className='font-extrabold text-2xl text-white'>🧠 CBT BOX </p>
        <HiMenuAlt2 size={30} className="text-white" />
      </nav>
  
      <div className='h-80 w-full flex  items-center '>
        <div className="px-5 md:text-center w-full">
          <p className="text-4xl font-black text-green-950 mb-2 leading-tight md:text-center">Embark on a Journey of Knowledge</p>

          <p className="text-base font-medium mt-3 mb-5 leading-loose text-gray-600 md:text-center">Let success be your guiding star as you explore our <small className='text-green-800 font-semibold'>CBT Practice APP</small></p>
          
          <small className='mt-2 text-center'><a href="#" className="px-3 py-2 mt-2 mb-1 rounded-xl  bg-green-100 text-sm text-green-700 hover:underline"> ➖&nbsp;&nbsp;<b className=''>C.Sc Help Group (Built by Joshua Boyi)</b></a></small>
        </div>
      </div>
    </header>
  
    <section className='w-full flex justify-center'>
      <div className='bg-white w-[90%] sm:w-1/2 h-1/2 xl:1/3 drop-shadow-lg rounded-md flex flex-col items-center justify-between py-8 sm:py-5 px-4 border-t-2 border-gray-200'>
        <div className='text-center'></div>
  
        <div className='w-full flex flex-col justify-center items-center my-4'>
          <div className='bg-gray-100  w-5/6 flex justify-between mb-6 py-3 px-2 rounded-lg items-center'>
            <img className='w-6 h-6 ml-1 mr-4' src={Email} alt='Email Icon' />
  
            <select className='outline-none focus:outline-none h-full bg-transparent mySelect capitalize' onChange={handleDepartmentChange}>
              <option value="">Select Department</option>
              {Object.keys(courseShortForms).map((course) => (
                <option key={course} value={course} className='capitalize'>{course}</option>
              ))}
            </select>
  
            <p>&nbsp;</p>
          </div>
  
          <button onClick={signInWithGoogle} className='bg-green-600 text-white w-5/6 py-3 font-semibold rounded-lg'>
            SignIn
          </button>
        </div>
  
        <div className='flex items-center gap-2 px-2 py-1 rounded-lg mt-2 bg-gray-100'>
          <img src={Google} alt='Google Icon' width={15} height={15} />
          <p className='text-sm'>Powered By Google</p>
        </div>
      </div>
    </section>
  
    <footer className=' text-white py-8 mt-5 bg-green-950'>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between mb-8">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <h4 className="text-xl font-bold mb-2">About Us</h4>
            <p className="text-sm">We are passionate about education and strive to make learning fun and engaging through our cbt practice app .</p>
          </div>
         
          <div className="w-full sm:w-auto my-7 sm:mb-0">
   
            <h4 className="text-xl font-bold mb-2">Contact</h4>
            <ul className="text-sm pt-1">
              
              <li className="flex mt-2 items-center mb-3">
                <FaWhatsapp className="mr-2 text-xl text-green-500" />
                <a href="https://wa.me/+2349034954069" className="text-green-100 font-semibold no-underline hover:underline">Chat us on WhatsApp</a>
              </li>
              
              <li className="flex mt-4 items-center ">
                <FaEnvelope className="mr-2 text-xl text-yellow-200" />
                <a href="mailto:csfun100@gmail.com" className="text-green-100 font-semibold no-underline hover:underline">Send us a mail</a>
              </li>
             
            </ul>
          </div>

        </div>

        <div className="my-8">
          <h4 className="text-xl font-bold mb-2">🌟 Credits</h4>
          {/* <p className="text-sm font-bold">Developed by the talented team at "Cbt Box" App:</p> */}
          <ul className="text-sm mt-3 flex flex-col gap-2">
            <li className='px-2 py-1 rounded-xl bg-green-900 w-fit'><strong className='text-green-100'>Joshua Boyi</strong> - Lead Developer</li>
            
            <li className='px-2 py-1 mt-2 rounded-xl bg-green-900 w-fit'><strong className='text-green-100'>Chisom Joseph</strong> - Frontend Designer</li>
          </ul>
        </div>

        <div className="my-14 text-sm flex flex-col gap-y-3">
          <p>Powered by : <strong className='text-green-100'>CSC HELP Group</strong> ⚡</p>
          <p className='text-green-50'>Courtesy of CSC Year 2 🎓</p>
        </div>
        <div className="border-t border-gray-100 pt-4 text-sm text-center">
          <p>&copy; 2024 Cbt Box. All rights reserved.</p>
        </div>
      </div>
    </footer>
    <Toaster />
  </div>
  
  );
}


export default protectedAuth(Auth)
