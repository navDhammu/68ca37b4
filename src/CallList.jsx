import React from 'react';
import CallListItem from './CallListItem.jsx';

export default function CallList({ callList, heading }) {
   return (
      <div className='container mx-auto max-w-xl'>
         <h1>{heading}</h1>
         <ul>
            {callList.map(({ id, ...callDetails }) => (
               <CallListItem key={id} {...callDetails} />
            ))}
         </ul>
      </div>
   );
}
