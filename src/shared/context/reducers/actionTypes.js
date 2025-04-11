const authAction = Object.freeze({
  AuthSuccess: "[AUTH] Success",
  AuthFail: "[AUTH] Fail",
  AuthAddAccount: "[AUTH] AddAccount",
});

const draftPostAction = Object.freeze({
  SetDraftPost: "[DRAFT_POST] Set Draft Post",
  ClearDraftPost: "[DRAFT_POST] Clear Draft Post",
});

const feedAction = Object.freeze({
  SetFeedData: "[FEED] Set Feed Data",
  ClearFeedData: "[FEED] Clear Feed Data",
});

export { authAction, draftPostAction, feedAction };
