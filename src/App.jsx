import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallList from './CallList.jsx';
// import mocks from './mocks.js';

export default function App() {
   const [allCalls, setAllCalls] = useState([]);

   const archivedCalls = allCalls.filter((call) => call.is_archived);

   useEffect(() => {
      const getAllCalls = async () => {
         //  setTimeout(() => setAllCalls(mocks), 200);
         const response = await fetch(
            'https://aircall-backend.onrender.com/activities'
         );
         const data = await response.json();
         setAllCalls(data);
      };

      getAllCalls();
   }, []);

   const handleArchive = async (call) => {
      const body = JSON.stringify({ is_archived: !call.is_archived });
      const response = await fetch(
         `https://aircall-backend.onrender.com/activities/${call.id}`,
         {
            headers: {
               'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body,
         }
      );
      const archivedCallId = call.id;
      if (response.ok) {
         setAllCalls(
            allCalls.map((prevCall) => {
               if (prevCall.id === archivedCallId) {
                  prevCall.is_archived = !prevCall.is_archived;
               }
               return prevCall;
            })
         );
      }
   };

   return (
      <>
         <Router>
            <Header />
            <Switch>
               <Route exact path='/'>
                  <CallList
                     heading='All Calls'
                     callList={allCalls}
                     handleArchive={handleArchive}
                  />
               </Route>
               <Route path='/archived'>
                  <CallList
                     heading='Archived Calls'
                     callList={archivedCalls}
                     handleArchive={handleArchive}
                  />
               </Route>
            </Switch>
         </Router>
      </>
   );
}

ReactDOM.render(<App />, document.getElementById('app'));
