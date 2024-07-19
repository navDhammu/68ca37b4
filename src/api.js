export default {
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
   archiveAll(calls) {
      return Promise.all(
         calls.map((call) => this.changeArchiveStatus(call.id, true))
      );
   },
   unarchiveAll(calls) {
      return Promise.all(
         calls.map((call) => this.changeArchiveStatus(call.id, false))
      );
   },
};
