import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallList from './CallList.jsx';
import mocks from './mocks.js';
import api from './api.js';

export default function App() {
   const [allCalls, setAllCalls] = useState([]);

   const archivedCalls = allCalls.filter((call) => call.is_archived);

   useEffect(() => {
      const getAllCalls = async () => {
         setTimeout(() => setAllCalls(mocks), 200);
         //  const response = await fetch(
         //     'https://aircall-backend.onrender.com/activities'
         //  );
         //  const data = await response.json();
         //  setAllCalls(data);
      };

      getAllCalls();
   }, []);

   const toggleCallArchive = async (call) => {
      setAllCalls(
         allCalls.map((prevCall) => {
            if (prevCall.id === call.id) {
               prevCall.is_archived = !prevCall.is_archived;
            }
            return prevCall;
         })
      );
   };

   const onToggleAllArchive = (archiveStatus) => {
      setAllCalls(
         allCalls.map((call) => {
            call.is_archived = archiveStatus;
            return call;
         })
      );
   };

   return (
      <>
         <Router>
            <Header onToggleAllArchive={onToggleAllArchive} />
            <Switch>
               <Route exact path='/'>
                  <CallList
                     heading='All Calls'
                     callList={allCalls}
                     toggleCallArchive={toggleCallArchive}
                  />
               </Route>
               <Route path='/archived'>
                  <CallList
                     heading='Archived Calls'
                     callList={archivedCalls}
                     toggleCallArchive={toggleCallArchive}
                  />
               </Route>
            </Switch>
         </Router>
      </>
   );
}

ReactDOM.render(<App />, document.getElementById('app'));
