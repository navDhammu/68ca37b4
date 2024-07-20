import React from 'react';

export default function Tabs({ tabs }) {
   return (
      <div className='flex space-x-1 sm:space-x-4 md:space-x-6 lg:space-x-10'>
         {tabs.map((tab) => (
            <button
               key={tab.name}
               onClick={tab.onSelectTab}
               className={`flex items-center space-x-2 hover:bg-black/40 ${
                  tab.isSelected ? 'bg-black/40' : ''
               } px-4 py-2 rounded-lg`}
            >
               {tab.icon}
               <span className='hidden md:inline text-gray-50'>
                  {tab.label}{' '}
               </span>
               <span className='inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold bg-green-500 rounded-full'>
                  {tab.stat}
               </span>
            </button>
         ))}
      </div>
   );
}
