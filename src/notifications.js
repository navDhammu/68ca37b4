import { toast } from 'react-hot-toast';

export default {
   error: () => toast('Unexpeced error occured. Please try again later'),
   success: {
      archive: () => toast('Successfully archived call'),
      unarchive: () => toast('Successfully unarchived call'),
      archiveAll: () => toast('Successfully archived all calls'),
      unarchiveAll: () => toast('Successfully unarchived all calls'),
   },
};
