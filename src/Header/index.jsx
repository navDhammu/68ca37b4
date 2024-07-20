import React from 'react';
import { PhoneIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default function Header({
   activityFeedCalls,
   archivedCalls,
   selectedTab,
   onSelectTab,
}) {
   return (
      <header className='bg-gray-700'>
         <div className='container mx-auto py-4 flex justify-between items-center'>
            <div className='flex gap-2 items-end'>
               <h1 className='text-2xl font-bold text-gray-50'>Aircall</h1>
               <span className='text-xs text-gray-100 uppercase italic'>
                  front end assessment
               </span>
            </div>
            <div className='flex space-x-10'>
               <button
                  onClick={() => onSelectTab('activity-feed')}
                  className={`flex items-center space-x-2 hover:bg-black/40 ${
                     selectedTab === 'activity-feed' ? 'bg-black/40' : ''
                  } px-4 py-2 rounded-lg`}
               >
                  <PhoneIcon className='size-6 text-green-500' />
                  <span className='text-gray-50'>Activity Feed</span>
                  <span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-green-800 bg-green-200 rounded-full'>
                     {activityFeedCalls.length}
                  </span>
               </button>
               <button
                  onClick={() => onSelectTab('archived')}
                  className={`flex items-center space-x-2 hover:bg-black/40 ${
                     selectedTab === 'archived' ? 'bg-black/40' : ''
                  } px-4 py-2 rounded-lg`}
               >
                  <ArchiveBoxIcon className='size-6 text-green-500' />
                  <span className='text-gray-50'>Archived Calls</span>
                  <span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-green-800 bg-green-200 rounded-full'>
                     {archivedCalls.length}
                  </span>
               </button>
            </div>
         </div>
      </header>
   );
}
