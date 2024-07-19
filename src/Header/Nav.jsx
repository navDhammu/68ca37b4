import React from 'react';

export default function Nav({ links }) {
   return (
      <nav className='font-semibold text-lg text-gray-800'>
         <ul className='flex items-center'>
            {links.map((link) => (
               <li
                  key={link.to}
                  className='px-1 py-4 md:px-4  border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active'
               >
                  <a href={link.to} className='flex gap-1 items-center'>
                     {link.icon}
                     <span className='hidden sm:block'>{link.name}</span>
                  </a>
               </li>
            ))}
         </ul>
      </nav>
   );
}
