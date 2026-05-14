import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  currentBranch: string | null;
  setCurrentBranch: (branch: string | null) => void;
}

export const useStore = create<GlobalState>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      currentBranch: null,
      setCurrentBranch: (branch) => set({ currentBranch: branch }),
    }),
    {
      name: 'emirates-optician-storage',
    }
  )
);
