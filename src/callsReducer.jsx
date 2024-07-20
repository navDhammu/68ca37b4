export default function callsReducer(calls, action) {
   switch (action.type) {
      case 'initialize': {
         return action.calls;
      }
      case 'toggle_archive': {
         return calls.map((call) => {
            if (call.id === action.call.id) {
               call.is_archived = !action.call.is_archived;
            }
            return call;
         });
      }
      case 'archive_all': {
         return calls.map((call) => {
            call.is_archived = true;
            return call;
         });
      }
      case 'unarchive_all': {
         return calls.map((call) => {
            call.is_archived = false;
            return call;
         });
      }
      default: {
         throw Error('Unknown action: ' + action.type);
      }
   }
}
