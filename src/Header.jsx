import React from 'react';
import { PhoneIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { useCalls, useTabs } from './contexts.js';

export default function Header() {
   const [selectedTab, onSelectTab] = useTabs();
   const { activityFeedCalls, archivedCalls, isLoadingCalls } = useCalls();

   return (
      <header className='bg-gray-700 px-4 h-'>
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
            <GithubLogo />
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

function GithubLogo() {
   return (
      <a
         className='flex justify-center items-end gap-1 text-gray-100'
         href='https://github.com/navDhammu/68ca37b4'
         target='_blank'
      >
         <svg
            className='w-7'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
         >
            <path
               fill-rule='evenodd'
               clip-rule='evenodd'
               d='M7.49936 0.850006C3.82767 0.850006 0.849976 3.8273 0.849976 7.50023C0.849976 10.4379 2.75523 12.9306 5.39775 13.8104C5.73047 13.8712 5.85171 13.6658 5.85171 13.4895C5.85171 13.3315 5.846 12.9135 5.84273 12.3587C3.99301 12.7604 3.60273 11.4671 3.60273 11.4671C3.30022 10.6988 2.86423 10.4942 2.86423 10.4942C2.26044 10.0819 2.90995 10.0901 2.90995 10.0901C3.57742 10.137 3.9285 10.7755 3.9285 10.7755C4.52167 11.7916 5.48512 11.4981 5.86396 11.3279C5.92438 10.8984 6.09625 10.6053 6.28608 10.4391C4.80948 10.2709 3.25695 9.70063 3.25695 7.15241C3.25695 6.42615 3.51618 5.83298 3.94157 5.368C3.87299 5.1998 3.64478 4.52375 4.00689 3.60807C4.00689 3.60807 4.56494 3.42926 5.83538 4.28941C6.36568 4.14204 6.93477 4.06856 7.50018 4.0657C8.06518 4.06856 8.63386 4.14204 9.16498 4.28941C10.4346 3.42926 10.9918 3.60807 10.9918 3.60807C11.3548 4.52375 11.1266 5.1998 11.0584 5.368C11.4846 5.83298 11.7418 6.42615 11.7418 7.15241C11.7418 9.70716 10.1868 10.2693 8.70571 10.4338C8.94412 10.6392 9.15681 11.045 9.15681 11.6655C9.15681 12.5542 9.14865 13.2715 9.14865 13.4895C9.14865 13.6675 9.26867 13.8745 9.60588 13.8095C12.2464 12.9282 14.15 10.4375 14.15 7.50023C14.15 3.8273 11.1723 0.850006 7.49936 0.850006Z'
               fill='currentColor'
            />
         </svg>
         <div className='hidden sm:flex gap-1 items-center'>
            <span>Github</span>
            <svg
               className='size-4'
               xmlns='http://www.w3.org/2000/svg'
               fill='none'
               viewBox='0 0 24 24'
               stroke-width='1.5'
               stroke='currentColor'
            >
               <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
               />
            </svg>
         </div>
      </a>
   );
}
