import { defineStore } from 'pinia'
import type { ResponseBoard } from '~/types/boards';

// State 인터페이스 정의
interface BoardState {
  boards: ResponseBoard[];
}

export const useBoardsStore = defineStore('boards',{
  state: (): BoardState => ({
    boards: [], 
  }),
  actions: {
    updateCookieAccessToken(boards: ResponseBoard[]) {
      this.boards.push(...boards);
    },
  },
  persist: {
    storage: persistedState.localStorage
  },
});