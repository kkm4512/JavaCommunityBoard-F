import { defineStore } from 'pinia'

interface MemberProfileImageURL {
  memberProfileImageURL: string;
}

export const useMemberProfileImageStore = defineStore('memberProfileImage',{
  state: (): MemberProfileImageURL => ({
    memberProfileImageURL: "", 
  }),
  actions: {
    updateMemberProfileImage(memberProfileImage: string) {
      this.memberProfileImageURL = memberProfileImage;

    },
  },
  persist: {
    storage: persistedState.localStorage
  },
});