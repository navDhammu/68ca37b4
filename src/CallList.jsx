import CallListItem from './CallListItem.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function CallList({
   callList,
   selectedCallId,
   onSelectCall,
   isLoadingCalls,
}) {
   if (isLoadingCalls) return <LoadingSpinner />;
   if (!callList.length)
      return <div className='text-gray-500 mt-36'> No calls to display</div>;

   return (
      <ul>
         {(() => {
            let prevDateString;
            return callList.map((call) => {
               const dateString = new Date(call.created_at).toDateString();
               const showDateHeader = dateString !== prevDateString;
               prevDateString = dateString;
               return (
                  <CallListItem
                     key={call.id}
                     call={call}
                     showDateHeader={showDateHeader}
                     isSelected={selectedCallId === call.id}
                     onSelectCall={onSelectCall}
                  />
               );
            });
         })()}
      </ul>
   );
}
