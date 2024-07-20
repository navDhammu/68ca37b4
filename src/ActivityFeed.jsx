import React, { useState } from 'react';
import Button from './Button.jsx';
import { useCalls, useCallsDispatch } from './contexts.js';

import CallListPage from './CallListPage.jsx';
import notifications from './notifications.js';
import api from './api.js';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';

export default function ActivityFeed() {
   const { activityFeedCalls } = useCalls();
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useCallsDispatch();

   const archiveAll = async () => {
      try {
         setIsLoading(true);
         await api.archiveMultipleCalls(activityFeedCalls);
         dispatch({ type: 'archive_all' });
         notifications.success.archiveAll();
      } catch (error) {
         notifications.error();
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <CallListPage
         calls={activityFeedCalls}
         heading='Activity Feed'
         archiveBtn={
            activityFeedCalls.length ? (
               <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={archiveAll}
               >
                  <ArchiveBoxArrowDownIcon className='size-5' />
                  Archive all calls
               </Button>
            ) : null
         }
      />
   );
}
