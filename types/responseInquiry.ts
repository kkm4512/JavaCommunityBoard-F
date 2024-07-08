export interface ResponseInquiry {
  id: number;
  title: string;
  description: string;
  category: string;
  memberId: number;
  createdAt: Date;
  filePath: string;
}