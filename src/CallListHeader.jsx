import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function CallListHeader({ heading, headerBtn, onSearchInput }) {
   return (
      <>
         <div className='flex justify-between'>
            <h1 className='text-xl font-semibold'>{heading}</h1>
            {headerBtn}
         </div>
         <div className='mt-4 relative w-full'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
               <MagnifyingGlassIcon className='size-6' />
            </div>
            <input
               type='text'
               onChange={onSearchInput}
               className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
               placeholder='Search by phone number...'
            />
         </div>
      </>
   );
}
