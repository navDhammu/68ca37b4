import React from 'react';
import { PhoneIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import Tabs from './Tabs.jsx';

export default function Header({
   activityFeedCalls,
   archivedCalls,
   selectedTab,
   onSelectTab,
}) {
   const tabs = [
      {
         name: 'activity-feed',
         label: 'Activity Feed',
         icon: <PhoneIcon className='size-6 text-green-500' />,
         isSelected: selectedTab === 'activity-feed',
         onSelectTab: () => onSelectTab('activity-feed'),
         stat: activityFeedCalls.length,
      },
      {
         name: 'archived',
         label: 'Archived Calls',
         icon: <ArchiveBoxIcon className='size-6 text-green-500' />,
         isSelected: selectedTab === 'archived',
         onSelectTab: () => onSelectTab('archived'),
         stat: archivedCalls.length,
      },
   ];
   return (
      <header className='bg-gray-700 pl-4'>
         <div className='container mx-auto py-4 flex justify-between items-center'>
            <div className='flex gap-2 items-end'>
               <h1 className='text-2xl font-bold text-gray-50'>Aircall</h1>
               <span className='hidden sm:inline text-xs text-gray-100 uppercase italic'>
                  front end assessment
               </span>
            </div>
            <Tabs tabs={tabs} />
         </div>
      </header>
   );
}
