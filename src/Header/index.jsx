import React from 'react';
import { PhoneIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default function Header({ activityFeedCalls, archivedCalls }) {
   return (
      <header class='bg-gray-700'>
         <div class='container mx-auto py-4 flex justify-between items-center'>
            <div className='flex gap-2 items-end'>
               <h1 class='text-2xl font-bold text-gray-50'>Aircall</h1>
               <span className='text-xs text-gray-100 uppercase italic'>
                  front end assessment
               </span>
            </div>
            <div class='flex space-x-10'>
               <button class='flex items-center space-x-2 hover:bg-black/40 px-4 py-2 rounded-lg'>
                  <PhoneIcon className='size-6 text-green-500' />
                  <span class='text-gray-50'>Activity Feed</span>
                  <span class='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-green-800 bg-green-200 rounded-full'>
                     {activityFeedCalls.length}
                  </span>
               </button>
               <button class='flex items-center space-x-2 hover:bg-black/40 px-4 py-2 rounded-lg'>
                  <ArchiveBoxIcon className='size-6 text-green-500' />
                  <span class='text-gray-50'>Archived Calls</span>
                  <span class='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-green-800 bg-green-200 rounded-full'>
                     {archivedCalls.length}
                  </span>
               </button>
            </div>
         </div>
      </header>
   );
}
