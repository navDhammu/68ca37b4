import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header/index.jsx';
import CallListItem from './CallListItem.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
   const [callList, setCallList] = useState([]);

   useEffect(() => {
      const getCallList = async () => {
         const response = await fetch(
            'https://aircall-backend.onrender.com/activities'
         );
         const data = await response.json();
         setCallList(data);
      };

      getCallList();
   }, []);

   return (
      <>
         <Router>
            <Header />
            <Switch>
               <Route exact path='/'>
                  <div className='container mx-auto max-w-xl'>
                     <ul>
                        {callList.map(({ id, ...callDetails }) => (
                           <CallListItem key={id} {...callDetails} />
                        ))}
                     </ul>
                  </div>
               </Route>
               <Route path='/archived'>
                  <div>archived calls</div>
               </Route>
            </Switch>
         </Router>
      </>
   );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
