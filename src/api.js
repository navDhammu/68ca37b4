export default {
   fetcher: async (...args) => {
      const response = await fetch(...args);
      if (!response.ok) throw new Error();
      return response;
   },
   async getAllCalls() {
      return (
         await this.fetcher(`https://aircall-backend.onrender.com/activities`)
      ).json();
   },
   // change the archive status of an individual call
   async changeArchiveStatus(callId, status) {
      const body = JSON.stringify({ is_archived: status });
      return this.fetcher(
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
