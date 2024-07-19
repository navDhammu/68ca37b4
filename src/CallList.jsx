import React, { useState } from 'react';
import CallListItem from './CallListItem.jsx';
import CallDetails from './CallDetails.jsx';
import useWindowWidth from './useWindowWidth.js';
import { ArrowLeftCircleIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const BREAKPOINT_WIDTH = 640;

export default function CallList({ callList, heading, onArchive }) {
   const [selectedCallId, setSelectedCallId] = useState(null);
   const windowWidth = useWindowWidth();
   const selectedCall = callList.find((call) => call.id === selectedCallId);
   const hideDetails = () => setSelectedCallId(null);

   return selectedCall && windowWidth < BREAKPOINT_WIDTH ? (
      <CallDetails
         details={selectedCall}
         onArchive={onArchive}
         hideIconBtn={
            <button onClick={hideDetails}>
               <ArrowLeftCircleIcon className='size-6' />
            </button>
         }
      />
   ) : (
      <div className='flex justify-center md:container mx-auto max-w-xl my-4 gap-8'>
         <div>
            <h1 className='text-xl text-center'>{heading}</h1>
            <ul>
               {callList.map((details) => (
                  <CallListItem
                     key={details.id}
                     details={details}
                     isSelected={selectedCallId === details.id}
                     selectCall={() => setSelectedCallId(details.id)}
                  />
               ))}
            </ul>
         </div>
         <CallDetails
            details={selectedCall}
            onArchive={onArchive}
            hideIconBtn={
               <button onClick={hideDetails}>
                  <EyeSlashIcon className='size-6' />
               </button>
            }
         />
      </div>
   );
}
