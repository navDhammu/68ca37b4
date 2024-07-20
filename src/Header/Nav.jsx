import { NavLink, useLocation } from 'react-router-dom';
export default function Nav({ links }) {
   const { pathname } = useLocation();

   return (
      <nav className='font-semibold text-md text-gray-700'>
         <ul className='flex items-center'>
            {links.map((link) => (
               <li
                  key={link.to}
                  className={`px-1 md:px-4 border-b-4 border-green-400 ${
                     pathname === link.to
                        ? 'text-green-500'
                        : 'border-opacity-0'
                  } hover:border-opacity-100 duration-200 cursor-pointer active`}
               >
                  <NavLink
                     to={link.to}
                     className={'py-5 flex gap-1 items-center'}
                  >
                     {link.icon}
                     <span className='hidden sm:block'>{link.name}</span>
                  </NavLink>
               </li>
            ))}
         </ul>
      </nav>
   );
}
