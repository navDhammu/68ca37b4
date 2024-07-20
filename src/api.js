export default {
   // change the archive status of an individual call
   changeArchiveStatus: async (callId, status) => {
      const body = JSON.stringify({ is_archived: status });
      return fetch(
         `https://aircall-backend.onrender.com/activities/${callId}`,
         {
            headers: {
               'Content-Type': 'application/json',
            },
            method: 'PATCH',
            body,
         }
      );
   },
   archiveSingleCall(call) {
      return this.changeArchiveStatus(call.id, true);
   },
   unarchiveSingleCall(call) {
      return this.changeArchiveStatus(call.id, false);
   },
   archiveMultipleCalls(calls) {
      return Promise.all(calls.map((call) => this.archiveSingleCall(call)));
   },
   unarchiveMultipleCalls(calls) {
      return Promise.all(calls.map((call) => this.unarchiveSingleCall(call)));
   },
};
