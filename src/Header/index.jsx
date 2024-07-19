import React from 'react';
import { PhoneIcon, ArchiveBoxIcon } from '@heroicons/react/24/solid';
import { AircallLogo, GithubLogo } from './Logos.jsx';
import Nav from './Nav.jsx';

export default function Header() {
   return (
      <header className='h-14 sticky shadow-md flex items-center justify-between px-7 py-2'>
         <AircallLogo />
         <div className='flex'>
            <Nav
               links={[
                  {
                     to: '/',
                     name: 'All Calls',
                     icon: <PhoneIcon className='size-5' />,
                  },
                  {
                     to: '/',
                     name: 'Archived Calls',
                     icon: <ArchiveBoxIcon className='size-5' />,
                  },
               ]}
            />
            <span className='w-0 border py-1 mx-2'></span>
            <GithubLogo />
         </div>
      </header>
   );
}
