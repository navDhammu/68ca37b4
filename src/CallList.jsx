import {
   PhoneArrowDownLeftIcon,
   PhoneArrowUpRightIcon,
} from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner.jsx';

const phoneIconColor = {
   answered: 'text-green-500',
   missed: 'text-red-500',
   voicemail: 'text-red-500',
};

const getTime = (dateString) => {
   const date = new Date(dateString);
   return date.toLocaleTimeString(undefined, {
      timeStyle: 'short',
   });
};

export default function CallList({
   callList,
   selectedCallId,
   selectCall,
   isLoadingCalls,
}) {
   if (isLoadingCalls) return <LoadingSpinner />;
   if (!callList.length)
      return <div className='text-gray-500 mt-36'> No calls to display</div>;

   return (
      <ul className=''>
         {callList.map((call) => (
            <li
               key={call.id}
               onClick={() => selectCall(call.id)}
               className={`flex gap-4 my-6 p-4 cursor-pointer relative overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl ${
                  selectedCallId === call.id
                     ? 'scale-105 border-green-400 bg-green-50 shadow-xl'
                     : ''
               }`}
            >
               <div className='bg-gray-100 rounded-md p-2 -m-2'>
                  {call.direction === 'inbound' ? (
                     <PhoneArrowDownLeftIcon
                        className={`size-6  ${phoneIconColor[call.call_type]}`}
                     />
                  ) : (
                     <PhoneArrowUpRightIcon
                        className={`size-6 m-auto ${
                           phoneIconColor[call.call_type]
                        }`}
                     />
                  )}
               </div>
               <div className='grid gap-3 flex-1'>
                  <div className='grid gap-1'>
                     <div className='text-gray-900 text-sm font-medium leading-snug'>
                        <div>
                           <span className='text-xs text-gray-400 italic'>
                              From
                           </span>
                           <span className='ml-1 mr-3 text-gray-800 font-semibold'>
                              {call.from}
                           </span>
                        </div>
                        <div>
                           <span className='text-xs text-gray-400 italic'>
                              To
                           </span>
                           <span className='ml-1 mr-3'>{call.to}</span>
                        </div>
                     </div>
                     <div className='text-gray-500 text-xs font-normal leading-4'></div>
                  </div>
               </div>
               <div>
                  <ChevronRightIcon className='size-5 ml-auto' />
                  <span
                     className={`px-2.5 py-1 mx-2 text-xs capitalize ${
                        call.call_type === 'answered'
                           ? 'bg-emerald-50 text-emerald-600'
                           : 'bg-red-50 text-red-600'
                     } rounded-full text-center text-sm font-medium leading-4`}
                  >
                     {call.call_type}
                  </span>
                  <span className='text-gray-400 text-xs'>
                     {getTime(call.created_at)}
                  </span>
               </div>
            </li>
         ))}
      </ul>
   );
}
{
   /* <span className='block text-xs text-gray-400 text-center mx-auto'>
{formatSeconds(call.duration)}
</span> */
}
