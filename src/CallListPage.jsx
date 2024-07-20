import React, { useState } from 'react';
import CallDetails from './CallDetails.jsx';
import CallList from './CallList.jsx';
import CallListHeader from './CallListHeader.jsx';

export default function CallListPage({ calls, archiveBtn, heading }) {
   const [selectedCallId, setSelectedCallId] = useState(null);
   const [searchInput, setSearchInput] = useState('');
   const [sortByDate, setSortByDate] = useState('ascending');

   const selectedCall = calls.find((call) => call.id === selectedCallId);

   const filteredAndSortedCalls = calls
      .filter(
         (call) =>
            call.from.toString().includes(searchInput) ||
            call.to.toString().includes(searchInput)
      )
      .sort((a, b) =>
         sortByDate === 'ascending'
            ? new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
      );

   return (
      <div className='relative lg:flex md:gap-6 lg:gap-10 px-4 py-4 mx-auto sm:max-w-4xl md:px-24 lg:px-8 lg:py-20'>
         <div className='flex-1 max-w-lg mx-auto'>
            <CallListHeader
               heading={heading}
               sortByDate={sortByDate}
               onSortByDateChange={(e) => setSortByDate(e.target.value)}
               onSearchInput={(e) => setSearchInput(e.target.value)}
               archiveBtn={archiveBtn}
            />
            <CallList
               callList={filteredAndSortedCalls}
               onSelectCall={(id) => setSelectedCallId(id)}
               selectedCallId={selectedCallId}
            />
         </div>
         {selectedCall && (
            <CallDetails
               details={selectedCall}
               onHideDetails={() => setSelectedCallId(null)}
            />
         )}
      </div>
   );
}
