import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallList from './CallList.jsx';

export default function App() {
   const [allCalls, setAllCalls] = useState([]);

   const activityFeedCalls = allCalls.filter((call) => !call.is_archived);
   const archivedCalls = allCalls.filter((call) => call.is_archived);

   useEffect(() => {
      const getAllCalls = async () => {
         const response = await fetch(
            'https://aircall-backend.onrender.com/activities'
         );
         const data = await response.json();
         setAllCalls(data);
      };

      getAllCalls();
   }, []);

   const changeCallArchiveStatus = (call, status) => {
      setAllCalls(
         allCalls.map((prevCall) => {
            if (prevCall.id === call.id) {
               prevCall.is_archived = status;
            }
            return prevCall;
         })
      );
   };

   const archiveSingleCall = (call) => changeCallArchiveStatus(call, true);
   const unarchiveSingleCall = (call) => changeCallArchiveStatus(call, false);

   const archiveAllCalls = () => {
      setAllCalls(
         allCalls.map((call) => {
            call.is_archived = true;
            return call;
         })
      );
   };

   const unarchiveAllCalls = () => {
      setAllCalls(
         allCalls.map((call) => {
            call.is_archived = false;
            return call;
         })
      );
   };

   return (
      <>
         <Router>
            <Header
               onArchiveAll={archiveAllCalls}
               onUnarchiveAll={unarchiveAllCalls}
               activityFeedCalls={activityFeedCalls}
               archivedCalls={archivedCalls}
            />
            <Switch>
               <Route exact path='/'>
                  <CallList
                     heading='All Calls'
                     callList={activityFeedCalls}
                     onArchiveCall={archiveSingleCall}
                     onUnarchiveCall={unarchiveSingleCall}
                  />
               </Route>
               <Route path='/archived'>
                  <CallList
                     heading='Archived Calls'
                     callList={archivedCalls}
                     onArchiveCall={archiveSingleCall}
                     onUnarchiveCall={unarchiveSingleCall}
                  />
               </Route>
            </Switch>
         </Router>
      </>
   );
}

ReactDOM.render(<App />, document.getElementById('app'));
