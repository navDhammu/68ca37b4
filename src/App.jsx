import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallList from './CallList.jsx';
import CallDetails from './CallDetails.jsx';

export default function App() {
   const [allCalls, setAllCalls] = useState([]);
   const [selectedCallId, setSelectedCallId] = useState(null);

   const selectedCall = allCalls.find((call) => call.id === selectedCallId?.id);
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

   return (
      <>
         <Router>
            <Header />
            <Switch>
               <Route exact path='/'>
                  <Layout
                     callList={allCalls}
                     selectedCall={selectedCall}
                     onHideSelected={() => setSelectedCallId(null)}
                  />
               </Route>
               <Route path='/archived'>
                  <Layout
                     callList={archivedCalls}
                     selectedCall={selectedCall}
                     onHideSelected={() => setSelectedCallId(null)}
                  />
               </Route>
            </Switch>
         </Router>
      </>
   );
}

ReactDOM.render(<App />, document.getElementById('app'));

function Layout({ callList, selectedCall, onHideSelected }) {
   return (
      <div className='flex-col sm:flex-row gap-4'>
         <CallList heading='All Calls' callList={callList} />
         {selectedCall && (
            <CallDetails
               details={selectedCall}
               onHideDetails={onHideSelected}
            />
         )}
      </div>
   );
}
