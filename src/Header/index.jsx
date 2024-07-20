import React from 'react';
import { AircallLogo, GithubLogo } from './Logos.jsx';
import Nav from './Nav.jsx';
import { useLocation } from 'react-router-dom';
import {
   ArchiveBoxArrowDownIcon,
   PhoneIcon,
   ArchiveBoxIcon,
} from '@heroicons/react/24/outline';
import api from '../api.js';

export default function Header({
   onArchiveAll,
   onUnarchiveAll,
   activityFeedCalls,
   archivedCalls,
}) {
   const { pathname } = useLocation();
   console.log(pathname);
   const handleArchiveBtnClick = async () => {
      if (pathname === '/') {
         await api.archiveAll(activityFeedCalls);
         onArchiveAll();
      } else if (pathname === '/archived') {
         await api.unarchiveAll(archivedCalls);
         onUnarchiveAll();
      }
   };
   return (
      <header className='h-16 sticky shadow-md flex items-center justify-between px-7 py-2'>
         <AircallLogo />
         <div className='flex'>
            <button
               className='flex gap-1 border-2 justify-center items-centerborder-2 mr-4 p-2 h-4/5 my-auto rounded-full'
               onClick={handleArchiveBtnClick}
            >
               {pathname === '/' ? (
                  <ArchiveBoxArrowDownIcon className='size-6' />
               ) : (
                  <ArchiveBoxIcon className='size-6' />
               )}
               {pathname === '/' ? 'Archive All' : 'Unarachive All'}
            </button>
            <Nav
               links={[
                  {
                     to: '/',
                     name: 'All Calls',
                     icon: <PhoneIcon className='size-5' />,
                  },
                  {
                     to: '/archived',
                     name: 'Archived Calls',
                     icon: <ArchiveBoxIcon className='size-5' />,
                  },
               ]}
            />

            <GithubLogo />
         </div>
      </header>
   );
}
