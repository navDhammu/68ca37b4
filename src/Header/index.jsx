import React from 'react';
import { PhoneIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { useCalls, useTabs } from '../contexts.js';

export default function Header() {
   const [selectedTab, onSelectTab] = useTabs();
   const { activityFeedCalls, archivedCalls, isLoadingCalls } = useCalls();

   return (
      <header className='bg-gray-700 pl-4 h-'>
         <div className='container mx-auto py-4 flex justify-between items-center'>
            <div className='flex gap-2 items-end'>
               <h1 className='text-2xl font-bold text-gray-50'>Aircall</h1>
               <span className='hidden sm:inline text-xs text-gray-100 uppercase italic'>
                  front end assessment
               </span>
            </div>
            <div className='flex space-x-1 sm:space-x-4 md:space-x-6 lg:space-x-10'>
               <Tab
                  label='Activity Feed'
                  isSelected={selectedTab === 'activity-feed'}
                  onSelectTab={() => onSelectTab('activity-feed')}
                  icon={<PhoneIcon className='size-6 text-green-500' />}
                  stat={isLoadingCalls ? null : activityFeedCalls.length}
               />
               <Tab
                  label='Archived Calls'
                  isSelected={selectedTab === 'archived'}
                  onSelectTab={() => onSelectTab('archived')}
                  icon={<ArchiveBoxIcon className='size-6 text-green-500' />}
                  stat={isLoadingCalls ? null : archivedCalls.length}
               />
            </div>
         </div>
      </header>
   );
}

function Tab({ icon, label, stat, isSelected, onSelectTab }) {
   return (
      <button
         onClick={onSelectTab}
         className={`flex items-center space-x-2 hover:bg-black/40 ${
            isSelected ? 'bg-black/40' : ''
         } px-4 py-2 rounded-lg`}
      >
         {icon}
         <span className='hidden md:inline text-gray-50'>{label} </span>
         <span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold bg-green-500 rounded-full'>
            {stat}
         </span>
      </button>
   );
}
