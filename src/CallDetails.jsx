import React from 'react';
import api from './api.js';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export function formatSeconds(seconds) {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = seconds % 60;
   const formattedMinutes = minutes > 0 ? `${minutes}m ` : '';
   const formattedSeconds = `${remainingSeconds}s`;
   return formattedMinutes + formattedSeconds;
}

export default function CallDetails({
   details,
   onHideDetails,
   onArchiveCall,
   onUnarchiveCall,
}) {
   if (!details) return null;

   const {
      direction,
      from,
      to,
      is_archived,
      created_at,
      via,
      call_type,
      duration,
   } = details;

   const handleArchiveBtnClick = async () => {
      if (is_archived) {
         await api.unarchiveSingleCall(details);
         onUnarchiveCall(details);
      } else {
         await api.archiveSingleCall(details);
         onArchiveCall(details);
      }
   };

   return (
      <div className='fixed sm:px-10 sm:p-10 md:p-20 lg:p-0 overflow-hidden w-full h-screen top-0 left-0 bg-white lg:relative flex-1 flex-col items-center mt-4 md:mt-0 p-2'>
         <div className='flex justify-between p-2 h-16 items-start'>
            <div className='flex gap-4 justify-center items-center'>
               <button
                  type='button'
                  onClick={onHideDetails}
                  className='flex gap-1 justify-center items-center p-2 text-sm border border-gray-300 rounded-lg shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-50'
               >
                  <ChevronLeftIcon className='size-5' />
               </button>
               <h1 className='text-xl font-semibold'> Call Details </h1>
            </div>
         </div>
         <div className='rounded-lg border-2'>
            <Detail label='from' value={from} />
            <Detail label='to' value={to} />
            <Detail label='via' value={via} />
            <Detail
               label='date'
               value={new Date(created_at).toLocaleDateString()}
            />
            <Detail label='duration' value={formatSeconds(duration)} />
            <Detail label='direction' value={direction} />
            <Detail label='call type' value={call_type} />
            <Detail
               label='status'
               value='archived'
               rightSection={
                  <button
                     type='button'
                     onClick={handleArchiveBtnClick}
                     class='py-2.5 px-6 text-sm bg-amber-50 text-amber-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-amber-100 hover:text-amber-700'
                  >
                     {is_archived ? 'unarchive call' : 'archive call'}
                  </button>
               }
            />
         </div>
      </div>
   );
}

function Detail({ label, value, rightSection }) {
   return (
      <div className='flex items-center sm:justify-start'>
         <div className='h-16 w-1/3 px-3 uppercase text-xs text-gray-400 bg-gray-100 flex justify-end items-center'>
            {label}
         </div>
         <span className='px-3'>{value} </span>
         {rightSection}
      </div>
   );
}
