"use client";

import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";




const HomeSearch = () => {

    const [input, setInput] = useState('')
    const [randomSearchLoading, setRandomSearchLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!input.trim()) return;
        
        router.push(`/search/web?searchTerm=${input}`)
    }
    
   async function randomSearch (){

     setRandomSearchLoading(true)

     const response = await fetch(
      "https://random-word-api.herokuapp.com/word"
     ).then((res) => res.json())
     .then((data) => data[0]);

     if(!response) return;
     router.push(`/search/web?searchTerm=${response}`)
     randomSearchLoading(false)
    }

  return (
   <div>

    <form 
    onSubmit={handleSubmit}
     className="flex w-full mt-5 mx-auto max-w-[90%] border border-gray-200 px-5 py-3 rounded-full hover:shadow-md focus-within:shadow-md transition-shadow sm:max-w-xl lg:max-w-2xl">
         <AiOutlineSearch className="text-xl text-gray-500 mr-3" />

         <input
          type="text"
          className="flex-grow focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}/>
        <BsFillMicFill className="text-lg" />
    </form>

    <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 justify-center sm:flex-row mt-8 ">

        <button 
        className="btn"
        onClick={handleSubmit}>
          Google Search
        </button>

        <button 
        className="btn flex items-center justify-center disabled:opacity-80"
        onClick={randomSearch}
        disabled={randomSearchLoading}>
            {
              randomSearchLoading ? (
                <img
                src="spinner.svg"
                alt="loading..."
                className="h-6 text-center"
              />
              ) : (
                "I am Feeling Lucky"
              )
            }
        </button>
    </div>
   </div>
  )
}

export default HomeSearch