import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import callsReducer from './callsReducer.jsx';
import api from './api.js';
import { CallsContext, CallsDispatchContext, TabsContext } from './contexts.js';
import ArchivedCalls from './ArchivedCalls.jsx';
import ActivityFeed from './ActivityFeed.jsx';
import { Toast } from './notifications.js';

export default function App() {
   const [calls, dispatch] = useReducer(callsReducer, []);
   const [selectedTab, setSelectedTab] = useState('activity-feed');
   const [isLoadingCalls, setIsLoadingCalls] = useState(true);

   const activityFeedCalls = calls.filter((call) => !call.is_archived);
   const archivedCalls = calls.filter((call) => call.is_archived);
   const onSelectTab = (tab) => setSelectedTab(tab);

   useEffect(() => {
      (async function () {
         try {
            setIsLoadingCalls(true);
            const calls = await api.getAllCalls();
            dispatch({ type: 'initialize', calls });
         } catch (error) {
            notifications.error();
         } finally {
            setIsLoadingCalls(false);
         }
      })();
   }, []);

   return (
      <CallsContext.Provider
         value={{ calls, activityFeedCalls, archivedCalls, isLoadingCalls }}
      >
         <TabsContext.Provider value={[selectedTab, onSelectTab]}>
            <CallsDispatchContext.Provider value={dispatch}>
               <Header />
               {selectedTab === 'activity-feed' && <ActivityFeed />}
               {selectedTab === 'archived' && <ArchivedCalls />}
               <Toast />
            </CallsDispatchContext.Provider>
         </TabsContext.Provider>
      </CallsContext.Provider>
   );
}

ReactDOM.render(<App />, document.getElementById('app'));
