export interface UpdateModal {
  updateModalOpen: boolean;
  title: string;
  description: string;
  updateBoardImage: string;
}

export interface ResponseUpdateModal {
  updateModalOpen: boolean;
  title: string;
  description: string;
  updateBoardImage: File | null;
}