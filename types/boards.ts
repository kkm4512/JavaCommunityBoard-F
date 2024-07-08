export interface ResponseBoard {
  boardId: number;
  memberId: number;
  title: string
  description: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  boardImagePath: string;
  id: number;

  likes: Likes[];
  comments: Comments[];

  shared?: boolean;
  sharedId: number;
}

interface Comments {
  id: number,
  boardId: number,
  memberId: number,
  comment: string,  
  createdAt: string,
  updatedAt: string,
}

interface Likes {
  boardId: number,
  memberId:number,
  liked: boolean,  
}

export interface Board {
  title: string;
  description: string;
  updateBoardImage: File | null;
}

export interface UpdateBoardRequest extends Board{
  boardId: number;
  memberId: number;
  nickname: string;
  updateBoardImage: File | null;
}

export interface ShareBoard {
  board: ResponseBoard;
  isShared: boolean;
}

export interface ResponseShareBoard {
  boardId: number;
  memberId: number;
  title: string
  description: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
  boardImagePath: string;
  id: number;

  likes: Likes[];
  comments: Comments[];

  shared: boolean;
  sharedId: number;
}