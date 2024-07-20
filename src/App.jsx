import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import api from './api.js';
import Calls from './Calls.jsx';

export default function App() {
   const [selectedTab, setSelectedTab] = useState('activity-feed');
   const [allCalls, setAllCalls] = useState([]);

   const activityFeedCalls = allCalls.filter((call) => !call.is_archived);
   const archivedCalls = allCalls.filter((call) => call.is_archived);

   useEffect(() => {
      (async function () {
         const calls = await api.getAllCalls();
         setAllCalls(calls);
      })();
   }, []);

   const onToggleArchiveStatus = (call) => {
      setAllCalls(
         allCalls.map((prevCall) => {
            if (prevCall.id === call.id) {
               prevCall.is_archived = !call.is_archived;
            }
            return prevCall;
         })
      );
   };

   const onSelectTab = (tab) => setSelectedTab(tab);

   const handleArchiveAll = async () => {
      await api.archiveMultipleCalls(activityFeedCalls);
      setAllCalls(
         allCalls.map((call) => {
            call.is_archived = true;
            return call;
         })
      );
   };
   const handleUnarchiveAll = async () => {
      await api.unarchiveMultipleCalls(archivedCalls);
      setAllCalls(
         allCalls.map((call) => {
            call.is_archived = false;
            return call;
         })
      );
   };

   return (
      <>
         <Header
            selectedTab={selectedTab}
            onSelectTab={onSelectTab}
            activityFeedCalls={activityFeedCalls}
            archivedCalls={archivedCalls}
         />
         {selectedTab === 'activity-feed' ? (
            <Calls
               heading='Activity Feed'
               callList={activityFeedCalls}
               onToggleArchiveStatus={onToggleArchiveStatus}
               headerBtn={
                  activityFeedCalls.length ? (
                     <button
                        onClick={handleArchiveAll}
                        type='button'
                        class='py-2.5 px-6 text-sm rounded-lg bg-white border border-amber-300  text-amber-500 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-amber-50 hover:text-amber-700'
                     >
                        Archive all
                     </button>
                  ) : null
               }
            />
         ) : (
            <Calls
               heading='Archived Calls'
               callList={archivedCalls}
               onToggleArchiveStatus={onToggleArchiveStatus}
               headerBtn={
                  archivedCalls.length ? (
                     <button
                        onClick={handleUnarchiveAll}
                        type='button'
                        class='py-2.5 px-6 text-sm rounded-lg bg-white border border-amber-300  text-amber-500 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-amber-50 hover:text-amber-700'
                     >
                        Unarchive all
                     </button>
                  ) : null
               }
            />
         )}
      </>
   );
}
ReactDOM.render(<App />, document.getElementById('app'));
