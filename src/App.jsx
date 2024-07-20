import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import api from './api.js';
import Calls from './Calls.jsx';
import Button from './ArchiveBtn.jsx';
import { Toaster } from 'react-hot-toast';
import notifications from './notifications.js';
import {
   ArchiveBoxArrowDownIcon,
   ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import ArchiveBtn from './ArchiveBtn.jsx';

export default function App() {
   const [selectedTab, setSelectedTab] = useState('activity-feed');
   const [allCalls, setAllCalls] = useState([]);
   const [isLoadingCalls, setIsLoadingCalls] = useState(true);
   const [isPendingArchive, setIsPendingArchive] = useState(false);

   const activityFeedCalls = allCalls.filter((call) => !call.is_archived);
   const archivedCalls = allCalls.filter((call) => call.is_archived);

   useEffect(() => {
      (async function () {
         try {
            const calls = await api.getAllCalls();
            setAllCalls(calls);
         } catch (error) {
            notifications.error();
         } finally {
            setIsLoadingCalls(false);
         }
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
      try {
         setIsPendingArchive(true);
         await api.archiveMultipleCalls(activityFeedCalls);
         setAllCalls(
            allCalls.map((call) => {
               call.is_archived = true;
               return call;
            })
         );
         setIsPendingArchive(false);
         notifications.success.archiveAll();
      } catch (error) {
         notifications.error();
      }
   };

   const handleUnarchiveAll = async () => {
      try {
         setIsPendingArchive(true);
         await api.unarchiveMultipleCalls(archivedCalls);
         setAllCalls(
            allCalls.map((call) => {
               call.is_archived = false;
               return call;
            })
         );
         setIsPendingArchive(false);
         notifications.success.unarchiveAll();
      } catch (error) {
         notifications.error();
      }
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
               isLoadingCalls={isLoadingCalls}
               onToggleArchiveStatus={onToggleArchiveStatus}
               headerBtn={
                  activityFeedCalls.length ? (
                     <ArchiveBtn
                        isLoading={isPendingArchive}
                        disabled={isPendingArchive}
                        onClick={handleArchiveAll}
                        isAll
                     />
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
                     <ArchiveBtn
                        isLoading={isPendingArchive}
                        disabled={isPendingArchive}
                        onClick={handleUnarchiveAll}
                        isAll
                        isUnarchive
                     />
                  ) : null
               }
            />
         )}
         <Toaster
            position='bottom-right'
            toastOptions={{
               className:
                  'bg-teal-100 border border-teal-200 font-semibold text-teal-800 rounded-lg',
            }}
         />
      </>
   );
}

ReactDOM.render(<App />, document.getElementById('app'));
