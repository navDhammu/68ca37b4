import React, { useState } from 'react';
import CallDetails from './CallDetails.jsx';
import CallList from './CallList.jsx';

export default function Calls({
   heading,
   headerBtn,
   callList,
   isLoadingCalls,
   onToggleArchiveStatus,
}) {
   const [selectedCallId, setSelectedCallId] = useState(null);
   const selectedCall = callList.find((call) => call.id === selectedCallId);
   const hideDetails = () => setSelectedCallId(null);
   const selectCall = (id) => setSelectedCallId(id);

   return (
      <div className='relative lg:flex md:gap-6 lg:gap-10 px-4 py-4 mx-auto sm:max-w-4xl md:px-24 lg:px-8 lg:py-20'>
         <div className='flex-1 max-w-lg mx-auto'>
            <div className='flex justify-between'>
               <h1 className='text-xl font-semibold'>{heading}</h1>
               {headerBtn}
            </div>
            <CallList
               selectCall={selectCall}
               selectedCallId={selectedCallId}
               callList={callList}
               isLoadingCalls={isLoadingCalls}
            />
         </div>
         <CallDetails
            details={selectedCall}
            onHideDetails={hideDetails}
            onToggleArchiveStatus={onToggleArchiveStatus}
         />
      </div>
   );
}
