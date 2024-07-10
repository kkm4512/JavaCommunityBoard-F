import type { Status } from "./inquiry";

export interface ResponseInquiry {
  id: number;
  inquiryId: number;
  title: string;
  description: string;
  category: string;
  memberId: number;
  createdAt: Date;
  filePath: string;
  status: Status
}