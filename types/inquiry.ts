export interface Inquiry {
  memberId: number;
  title: string;
  description: string;
  category: Category;
  file: File | null;
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