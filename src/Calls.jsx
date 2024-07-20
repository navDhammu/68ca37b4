import React, { useState } from 'react';
import CallDetails from './CallDetails.jsx';
import CallList from './CallList.jsx';

export default function Calls({
   callList,
   heading,
   onArchiveCall,
   onUnarchiveCall,
}) {
   const [selectedCallId, setSelectedCallId] = useState(null);
   const selectedCall = callList.find((call) => call.id === selectedCallId);
   const hideDetails = () => setSelectedCallId(null);
   const selectCall = (id) => setSelectedCallId(id);

   return (
      <div className='lg:flex md:gap-6 lg:gap-10 px-4 py-4 mx-auto sm:max-w-4xl md:px-24 lg:px-8 lg:py-20'>
         <div className='flex-1 max-w-lg mx-auto'>
            <div className='flex justify-between'>
               <h1 className='text-xl font-semibold'>{heading}</h1>
               <button
                  type='button'
                  class='py-2.5 px-6 text-sm rounded-lg bg-white border border-amber-300  text-amber-500 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-amber-50 hover:text-amber-700'
               >
                  Archive all
               </button>
            </div>
            <CallList
               selectCall={selectCall}
               selectedCallId={selectedCallId}
               callList={callList}
            />
         </div>
         <CallDetails
            details={selectedCall}
            onHideDetails={hideDetails}
            onArchiveCall={onArchiveCall}
            onUnarchiveCall={onUnarchiveCall}
         />
      </div>
   );
}
