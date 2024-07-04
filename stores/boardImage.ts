import { defineStore } from 'pinia'


export const useBoardImageStore = defineStore('boardImage',{
  state: () => ({
    boardImagePath: "", 
  }),
  actions: {
    updateBoardImagePath(boardImagePath: string) {
      this.boardImagePath = boardImagePath;
    },
  },
  persist: {
    storage: persistedState.localStorage
  },
});