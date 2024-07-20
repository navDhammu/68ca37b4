import { Toaster, toast } from 'react-hot-toast';

export default {
   error: () => toast.error('Unexpeced error occured. Please try again later'),
   success: {
      archive: () => toast.success('Successfully archived call'),
      unarchive: () => toast.success('Successfully unarchived call'),
      archiveAll: () => toast.success('Successfully archived all calls'),
      unarchiveAll: () => toast.success('Successfully unarchived all calls'),
   },
};

export function Toast() {
   return (
      <Toaster
         position='bottom-center'
         toastOptions={{
            success: {
               className:
                  'bg-green-50 border border-teal-200 font-semibold rounded-lg',
            },
            error: {
               className:
                  'bg-red-50 border border-red-200 font-semibold rounded-lg',
            },
         }}
      />
   );
}
