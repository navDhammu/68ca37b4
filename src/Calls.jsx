import React, { useState } from 'react';
import CallDetails from './CallDetails.jsx';
import CallList from './CallList.jsx';
import CallListHeader from './CallListHeader.jsx';

export default function Calls({
   heading,
   headerBtn,
   callList,
   isLoadingCalls,
   onToggleArchiveStatus,
}) {
   const [selectedCallId, setSelectedCallId] = useState(null);
   const [searchInput, setSearchInput] = useState('');
   const [sortByDate, setSortByDate] = useState('ascending');

   const selectedCall = callList.find((call) => call.id === selectedCallId);
   const filteredCallList = callList.filter((call) =>
      call.from.toString().includes(searchInput)
   );
   const sortedCallList = filteredCallList.sort((a, b) =>
      sortByDate === 'ascending'
         ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
         : new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
   );

   return (
      <div className='relative lg:flex md:gap-6 lg:gap-10 px-4 py-4 mx-auto sm:max-w-4xl md:px-24 lg:px-8 lg:py-20'>
         <div className='flex-1 max-w-lg mx-auto'>
            <CallListHeader
               heading={heading}
               headerBtn={headerBtn}
               sortByDate={sortByDate}
               onSortByDateChange={(e) => setSortByDate(e.target.value)}
               onSearchInput={(e) => setSearchInput(e.target.value)}
            />
            <CallList
               callList={sortedCallList}
               onSelectCall={(id) => setSelectedCallId(id)}
               selectedCallId={selectedCallId}
               isLoadingCalls={isLoadingCalls}
            />
         </div>
         <CallDetails
            details={selectedCall}
            onHideDetails={() => setSelectedCallId(null)}
            onToggleArchiveStatus={onToggleArchiveStatus}
         />
      </div>
   );
}
