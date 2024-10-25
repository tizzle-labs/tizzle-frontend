import { create } from 'zustand';

const useStore = create(set => ({
  selectedAgent: 'cortez',
  setSelectedAgent: agent => set({ selectedAgent: agent }),
  updatedToken: 0,
  setUpdatedToken: currToken => set({ updatedToken: currToken }),
}));

export default useStore;
