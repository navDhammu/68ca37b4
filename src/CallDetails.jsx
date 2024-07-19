import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import useWindowWidth from './useWindowWidth';
import { EyeSlashIcon } from '@heroicons/react/24/outline';

export default function CallDetails({ details, onHideDetails }) {
   const { direction, from, to, is_archived, created_at } = details;
   const windowWidth = useWindowWidth();

   return (
      <div className=''>
         <div className='flex gap-2 justify-center items-center'>
            {windowWidth > 500 ? (
               <EyeSlashIcon className='size-6' onClick={onHideDetails} />
            ) : (
               <ArrowLeftCircleIcon
                  className='size-6'
                  onClick={onHideDetails}
               />
            )}
            <h1 className='text-2xl'> Call Details </h1>
         </div>
         <div>{new Date(created_at).toLocaleDateString()}</div>
         <div className='text-gray-400'> {direction} </div>
         <div>From: {from}</div>
         <div>To: {to}</div>
         {is_archived ? (
            <button
               type='button'
               className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
               Archive
            </button>
         ) : (
            <button
               type='button'
               className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
               Unarchive
            </button>
         )}
      </div>
   );
}
