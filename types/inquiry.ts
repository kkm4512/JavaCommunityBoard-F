import type { InquiryReject } from "~/components/InquiryRejectModal.vue";

export interface Inquiry {
  memberId: number;
  title: string;
  description: string;
  category: Category;
  file: File | null;
  completed: boolean;
}

enum Category {
  Error = "오류사항",
  Fix = "개선사항",
  Good = "칭찬사항",
  Other = "그 외"
}

export interface ResponseInquiry {
  memberId: number;
  title: string;
  description: string;
  category: Category;
}

export interface ResponseCompleteInquiry {
  inquiryId: number;
  memberId: number;
  title: string;
  description: string;
  category: Category;
  filePath: string;
  status: Status;  
  createdAt: string;

  rejectInquiryDTO:InquiryReject
}

export enum Status {
  IN_PROCESS = "IN_PROCESS",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED",
}