import {
   PhoneArrowDownLeftIcon,
   PhoneArrowUpRightIcon,
} from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const phoneIconColor = {
   answered: 'text-emerald-500',
   missed: 'text-red-500',
   voicemail: 'text-red-500',
};

const getTime = (dateString) => {
   const date = new Date(dateString);
   return date.toLocaleTimeString(undefined, {
      timeStyle: 'short',
   });
};

export default function CallListItem({
   call,
   onSelectCall,
   showDateHeader,
   isSelected,
}) {
   return (
      <li key={call.id} className='mb-3'>
         {showDateHeader && (
            <h1 className='mt-6 mb-2 text-gray-500 text-sm'>
               {new Date(call.created_at).toDateString()}
            </h1>
         )}

         <button
            onClick={() => onSelectCall(call.id)}
            className={`w-full sm:h-20 flex items-end gap-4 p-3 cursor-pointer relative overflow-hidden transition duration-300 transform border rounded-md shadow-sm hover:scale-105 group hover:shadow-xl ${
               isSelected
                  ? 'scale-105 border-green-400 bg-green-50 shadow-xl'
                  : ''
            }`}
         >
            <div className='my-auto p-3 bg-gray-100 rounded-md'>
               {call.direction === 'inbound' ? (
                  <PhoneArrowDownLeftIcon
                     className={`size-8  ${phoneIconColor[call.call_type]}`}
                  />
               ) : (
                  <PhoneArrowUpRightIcon
                     className={`size-8 ${phoneIconColor[call.call_type]}`}
                  />
               )}
            </div>

            <div className='flex flex-col text-left items-start sm:flex-row sm:justify-between flex-1 text-gray-900 text-sm font-medium leading-snug'>
               <div>
                  <div className='mb-1'>
                     <span className='text-gray-400 italic'>From</span>
                     <span className='ml-1 mr-3 text-gray-800 font-semibold'>
                        {call.from}
                     </span>
                  </div>
                  <div>
                     <span className=' text-gray-400 italic'>To</span>
                     <span className='ml-1 mr-3'>{call.to}</span>
                  </div>
               </div>
               <span
                  className={`self-end px-2.5 py-1 text-xs ${
                     call.call_type === 'answered'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-red-50 text-red-600'
                  } rounded-full text-center text-sm font-medium leading-4`}
               >
                  {call.call_type}
               </span>
            </div>

            <div>
               <ChevronRightIcon className='size-5 ml-auto' />
               <span className='text-gray-400 text-xs'>
                  {getTime(call.created_at)}
               </span>
            </div>
         </button>
      </li>
   );
}
