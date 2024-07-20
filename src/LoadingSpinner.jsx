import React from 'react';

export default function LoadingSpinner() {
   return (
      <div
         className='absolute top-72 left-1/2 animate-spin inline-block size-14 border-[3px] border-current border-t-transparent text-green-600 rounded-full'
         role='status'
         aria-label='loading'
      >
         <span className='sr-only'>Loading...</span>
      </div>
   );
}
