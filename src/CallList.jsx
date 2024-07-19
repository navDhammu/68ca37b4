import React, { useState } from 'react';
import CallListItem from './CallListItem.jsx';
import CallDetails from './CallDetails.jsx';
import useWindowWidth from './useWindowWidth.js';
import { ArrowLeftCircleIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const BREAKPOINT_WIDTH = 640;

export default function CallList({ callList, heading }) {
   const [selectedCallId, setSelectedCallId] = useState(null);
   const windowWidth = useWindowWidth();
   const selectedCall = callList.find((call) => call.id === selectedCallId);
   const hideDetails = () => setSelectedCallId(null);

   return selectedCall && windowWidth < BREAKPOINT_WIDTH ? (
      <CallDetails
         details={selectedCall}
         hideIconBtn={
            <button onClick={hideDetails}>
               <ArrowLeftCircleIcon className='size-6' />
            </button>
         }
      />
   ) : (
      <div className='container mx-auto max-w-xl flex '>
         <h1>{heading}</h1>
         <ul>
            {callList.map((details) => (
               <CallListItem
                  key={details.id}
                  details={details}
                  selectCall={() => setSelectedCallId(details.id)}
               />
            ))}
         </ul>
         <CallDetails
            details={selectedCall}
            hideIconBtn={
               <button onClick={hideDetails}>
                  <EyeSlashIcon className='size-6' />
               </button>
            }
         />
      </div>
   );
}
