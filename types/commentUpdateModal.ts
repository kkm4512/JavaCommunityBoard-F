export interface CommentsDatas {
  id: number;
  memberId: number;
  boardId: number;
  comment: string;
}

export interface CommentUpdateModal {
  id: number;
  comment: string;
  updateClicked: boolean;
  memberId: number;
  boardId: number;  
}

export interface CommentRemoveModal {
  id: number;
  removeClicked: boolean;
  memberId: number;
  boardId: number;  
}

export interface CommentDatasSendCommentModal {
  commentDatas: CommentsDatas[];
  createMemberBoardId: number;
}