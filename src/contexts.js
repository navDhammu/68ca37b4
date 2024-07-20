import { createContext, useContext } from 'react';

export const CallsContext = createContext(null);
export const CallsDispatchContext = createContext(null);
export const TabsContext = createContext(null);

export function useCalls() {
   return useContext(CallsContext);
}

export function useCallsDispatch() {
   return useContext(CallsDispatchContext);
}

export function useTabs() {
   return useContext(TabsContext);
}
