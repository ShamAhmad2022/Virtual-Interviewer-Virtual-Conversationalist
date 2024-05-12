"use client";

import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function ShowNote() {

  const [show, setShow] = useState(false);

    useEffect(()=>{
      setShow(true);
    },[]);

    useEffect(()=>{

      if(show){
        
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white/90 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    Important Note:
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    This web app is still not compatible on all browsers, for now it
                    will only work as expected on <span className='font-medium'>desktop Google Chrome and Microsoft Edge.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex text-lg items-center justify-center font-medium"
              >
                ×
              </button>
            </div>
          </div>
        ));
      }

    },[show]);

  return (
    <Toaster position="top-left" reverseOrder={false} />
  )
}

export default ShowNote;