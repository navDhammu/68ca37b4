import React, { useState } from 'react';
import Button from './Button.jsx';
import { useCalls, useCallsDispatch } from './contexts.js';
import CallListPage from './CallListPage.jsx';
import notifications from './notifications.js';
import api from './api.js';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';

export default function ArchivedCalls() {
   const { archivedCalls } = useCalls();
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useCallsDispatch();

   const unarchiveAll = async () => {
      try {
         setIsLoading(true);
         await api.unarchiveMultipleCalls(archivedCalls);
         dispatch({ type: 'unarchive_all' });
         notifications.success.unarchiveAll();
      } catch (error) {
         notifications.error();
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <CallListPage
         calls={archivedCalls}
         heading='Archived Calls'
         archiveBtn={
            archivedCalls.length ? (
               <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={unarchiveAll}
               >
                  <ArchiveBoxIcon className='size-5' />
                  Unarchive all calls
               </Button>
            ) : null
         }
      />
   );
}
