import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import CallListItem from './CallListItem.jsx';

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
         <Header />
         <div className='container mx-auto max-w-xl'>
            <ul>
               {callList.map(({ id, ...callDetails }) => (
                  <CallListItem key={id} {...callDetails} />
               ))}
            </ul>
         </div>
      </>
   );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
