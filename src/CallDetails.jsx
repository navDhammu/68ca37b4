import React from 'react';

function formatSeconds(seconds) {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = seconds % 60;
   const formattedMinutes = minutes > 0 ? `${minutes}m ` : '';
   const formattedSeconds = `${remainingSeconds}s`;
   return formattedMinutes + formattedSeconds;
}

export default function CallDetails({ details, hideIconBtn, handleArchive }) {
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

   return (
      <div className='flex-col items-center justify-center mt-4 md:mt-0 p-2'>
         <div className='flex gap-2 justify-center items-center my-4'>
            {hideIconBtn}
            <h1 className='text-xl'> Call Details </h1>
         </div>
         <Detail
            label='date'
            value={new Date(created_at).toLocaleDateString()}
         />
         <Detail label='duration' value={formatSeconds(duration)} />
         <Detail label='direction' value={direction} />
         <Detail label='from' value={from} />
         <Detail label='to' value={to} />
         <Detail label='call type' value={call_type} />
         <Detail label='via' value={via} />
         <div className='text-center mt-3'>
            <button
               onClick={() => handleArchive(details)}
               type='button'
               className=' text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
               {is_archived ? 'Unarchive' : 'archive'}
            </button>
         </div>
      </div>
   );
}

function Detail({ label, value }) {
   return (
      <div className='flex gap-2 items-center justify-center sm:justify-start my-2'>
         <span className='text-sm uppercase text-gray-400 text-right'>
            {label}
         </span>
         <span>{value}</span>
      </div>
   );
}
