import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import api from './api.js';
import Calls from './Calls.jsx';
import Button from './Button.jsx';
import { Toaster } from 'react-hot-toast';
import notifications from './notifications.js';

export default function App() {
   const [selectedTab, setSelectedTab] = useState('activity-feed');
   const [allCalls, setAllCalls] = useState([]);
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
               onToggleArchiveStatus={onToggleArchiveStatus}
               headerBtn={
                  activityFeedCalls.length ? (
                     <Button
                        isLoading={isPendingArchive}
                        disabled={isPendingArchive}
                        onClick={handleArchiveAll}
                     >
                        Archive all
                     </Button>
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
                     <Button
                        isLoading={isPendingArchive}
                        disabled={isPendingArchive}
                        onClick={handleUnarchiveAll}
                     >
                        Unarchive all
                     </Button>
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
