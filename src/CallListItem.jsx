import React from 'react';
import {
   ArrowRightCircleIcon,
   PhoneArrowDownLeftIcon,
   PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';

const phoneIconColor = {
   answered: 'text-green-500',
   missed: 'text-red-500',
   voicemail: 'text-red-500',
};

const getTime = (dateString) => {
   const date = new Date(dateString);
   return date.toLocaleTimeString(undefined, {
      timeStyle: 'short',
   });
};

export default function CallListItem({ details, selectCall, isSelected }) {
   const { direction, call_type, from, via, created_at } = details;

   return (
      <li
         className={`${
            isSelected ? 'border-green-500 border-2 bg-green-50 rounded-md' : ''
         } max-w-sm mx-auto gap-3 p-4 flex items-center mb-4`}
      >
         <div>
            {direction === 'inbound' ? (
               <PhoneArrowDownLeftIcon
                  className={`size-6 ${phoneIconColor[call_type]}`}
               />
            ) : (
               <PhoneArrowUpRightIcon
                  className={`size-6 ${phoneIconColor[call_type]}`}
               />
            )}
         </div>
         <div className='flex-1'>
            <div>{from}</div>
            <span className='text-gray-400 inline'>Via: {via}</span>
         </div>
         <span className='text-xs text-gray-400 shrink-0'>
            {getTime(created_at)}
         </span>
         <button
            onClick={selectCall}
            className='flex items-center justify-center gap-1 text-sm  text-gray-400'
         >
            <ArrowRightCircleIcon className='size-7' />
         </button>
      </li>
   );
}
