export default {
   async getAllCalls() {
      const response = await fetch(
         `https://aircall-backend.onrender.com/activities`
      );
      if (!response.ok) throw new Error();
      return response.json();
   },

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
   toggleArchiveStatus(call) {
      return this.changeArchiveStatus(call.id, !call.is_archived);
   },

   archiveMultipleCalls(calls) {
      return Promise.all(
         calls.map((call) => this.changeArchiveStatus(call.id, true))
      );
   },
   unarchiveMultipleCalls(calls) {
      return Promise.all(
         calls.map((call) => this.changeArchiveStatus(call.id, false))
      );
   },
};
