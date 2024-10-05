import { create } from 'zustand';

const useStore = create(set => ({
  selectedAgent: 'cortez',
  setSelectedAgent: agent => set({ selectedAgent: agent }),
}));

export default useStore;
