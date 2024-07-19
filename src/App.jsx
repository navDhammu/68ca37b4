import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CallList from './CallList.jsx';

const App = () => {
   const [allCalls, setAllCalls] = useState([]);

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
                  <CallList heading='All Calls' callList={allCalls} />
               </Route>
               <Route path='/archived'>
                  <CallList heading='Archived Calls' callList={archivedCalls} />
               </Route>
            </Switch>
         </Router>
      </>
   );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
