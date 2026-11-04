import React, { createContext, useContext } from 'react';

const ToastContext = createContext();
// Keep notification calls compatible while disabling toast UI site-wide.
const toastActions = {
  showToast: () => {},
  removeToast: () => {},
};

export function ToastProvider({ children }) {
  return (
    <ToastContext.Provider value={toastActions}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
