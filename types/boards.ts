export interface ResponseBoard {
  boardId: number;
  memberId: number;
  title: string
  description: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  title: string;
  description: string;
}

export interface UpdateBoardRequest extends Board{
  boardId: number;
  memberId: number;
  nickname: string;
}