module.exports = {
  postService: {
    GET_BY_ID_PARAMS: "[postService.getById] id={}",
    GET_BY_ID_SUCCESS: "[postService.getById] status={} result={}",
    GET_BY_ID_ERROR: "[postService.getById] success status={} response={}",

    GET_LIST_PARAMS: "[postService.getList] page={}, limit={}",
    GET_LIST_SUCCESS: "[postService.getList] status={} result={}",
    GET_LIST_ERROR: "[postService.getList] success status={} response={}",

    GET_COMMENT_PARAMS:
      "[postService.getPostCommentList] postid={}, page={}, limit={}",
    GET_COMMENT_SUCCESS: "[postService.getPostCommentList] status={} result={}",
    GET_COMMENT_ERROR:
      "[postService.getPostCommentList] success status={} response={}",
  },

  userService: {
    GET_BY_ID_PARAMS: "[userService.getById] id={}",
    GET_BY_ID_SUCCESS: "[userService.getById] status={} result={}",
    GET_BY_ID_ERROR: "[userService.getById] success status={} response={}",

    GET_LIST_PARAMS: "[userService.getList] page={}, limit={}",
    GET_LIST_SUCCESS: "[userService.getList] status={} result={}",
    GET_LIST_ERROR: "[userService.getList] success status={} response={}",

    GET_POST_PARAMS_PARAMS:
      "[userService.getPostList] userid={}, page={}, limit={}",
    GET_POST_SUCCESS: "[userService.getPostList] success status={} result={}",
    GET_POST_ERROR: "[userService.getPostList] error status={} response={}",

    UPDATE_PARAMS: "[userService.update] userid={}, user {}",
    UPDATE_SUCCESS: "[userService.update] success status={} result={}",
    UPDATE_ERROR: "[userService.update] error status={} response={}",

    UPDATE_AVATAR_PARAMS: "[userService.updateAvatar] userid={}, file={}",
    UPDATE_AVATAR_SUCCESS:
      "[userService.updateAvatar] success status={} result={}",
    UPDATE_AVATAR_ERROR:
      "[userService.updateAvatar] error status={} response={}",
  },

  postApi: {
    GET: "[postApi.loadFile] url={}",
    GET_FAIL: "[postApi.loadFile] fail id={}, error={}",
    GET_SUCCESS: "[postApi.loadFile] success id={}, content={}",
  },

  postRepository: {
    GET_THIRD_PARTY_INVOKE:
      "[postRepository.getThirdParty] invoke postApi.get id={}",
    GET_THIRD_PARTY_REPLY_SUCCESS:
      "[postRepository.getThirdParty] id={} reply {}",
    GET_THIRD_PARTY_REPLY_ERROR: "[postRepository.getThirdParty] error {}",
    GET_THIRD_PARTY_REPLY_RESULT: "[postRepository.getThirdParty] result {}",

    LIST_THIRD_PARTY_INVOKE:
      "[postRepository.listThirdParty] invoke postApi.list page={}, list={}",
    LIST_THIRD_PARTY_REPLY_SUCCESS:
      "[postRepository.listThirdParty] page={}, list={}, reply {}",
    LIST_THIRD_PARTY_REPLY_ERROR: "[postRepository.listThirdParty] error {}",
    LIST_THIRD_PARTY_REPLY_RESULT: "[postRepository.listThirdParty] result {}",

    COMMENT_THIRD_PARTY_INVOKE:
      "[postRepository.listCommentsThirdParty] invoke postApi.listComments pageId={}, page={}, list={}",
    COMMENT_THIRD_PARTY_REPLY_SUCCESS:
      "[postRepository.listCommentsThirdParty] reply {}",
    listComments: "[postRepository.listThirdParty] error {}",
    COMMENT_THIRD_PARTY_REPLY_ERROR:
      "[postRepository.listCommentsThirdParty] error {}",
    COMMENT_THIRD_PARTY_REPLY_RESULT:
      "[listComments.listCommentsThirdParty] result {}",
  },

  userRepository: {
    GET_THIRD_PARTY_INVOKE:
      "[userRepository.getThirdParty] invoke postApi.get id={}",
    GET_THIRD_PARTY_REPLY_SUCCESS:
      "[userRepository.getThirdParty] id={} reply {}",
    GET_THIRD_PARTY_REPLY_ERROR: "[userRepository.getThirdParty] error {}",
    GET_THIRD_PARTY_REPLY_RESULT: "[userRepository.getThirdParty] result {}",

    LIST_THIRD_PARTY_INVOKE:
      "[userRepository.listThirdParty] invoke postApi.list page={}, list={}",
    LIST_THIRD_PARTY_REPLY_SUCCESS:
      "[userRepository.listThirdParty] page={}, list={}, reply {}",
    LIST_THIRD_PARTY_REPLY_ERROR: "[userRepository.listThirdParty] error {}",
    LIST_THIRD_PARTY_REPLY_RESULT: "[userRepository.listThirdParty] result {}",

    LIST_POSTS_THIRD_PARTY_INVOKE:
      "[userRepository.listByUserThirdParty] invoke postApi.getPostListByUser userId={}, page={}, list={}",
    LIST_POSTS_THIRD_PARTY_REPLY_SUCCESS:
      "[userRepository.listByUserThirdParty] page={}, list={}, reply {}",
    LIST_POSTS_THIRD_PARTY_REPLY_ERROR:
      "[userRepository.listByUserThirdParty] error {}",
    LIST_POSTS_THIRD_PARTY_REPLY_RESULT:
      "[userRepository.listByUserThirdParty] result {}",

    UPDATE_THIRD_PARTY_INVOKE:
      "[userRepository.updateThirdParty] invoke userApi.updateUser userId={}, user={}",
    UPDATE_THIRD_PARTY_REPLY_SUCCESS:
      "[userRepository.updateThirdParty] reply {}",
    UPDATE_THIRD_PARTY_REPLY_ERROR:
      "[userRepository.updateThirdParty] error {}",
    UPDATE_THIRD_PARTY_REPLY_RESULT:
      "[userRepository.updateThirdParty] result {}",

    UPLOAD_AVATAR_THIRD_PARTY_INVOKE:
      "[userRepository.uploadAvatarThirdParty] invoke imgDbApi.uploadImg file={}",
    UPLOAD_AVATAR_THIRD_PARTY_REPLY_SUCCESS:
      "[userRepository.uploadAvatarThirdParty] reply {}",
    UPLOAD_AVATAR_THIRD_PARTY_REPLY_ERROR:
      "[userRepository.uploadAvatarThirdParty] error {}",
    UPLOAD_AVATAR_THIRD_PARTY_REPLY_RESULT:
      "[userRepository.uploadAvatarThirdParty] result {}",
  },

  fileRepository: {
    LOAD_FILE_THIRD_PARTY_INVOKE:
      "[FileRepository.loadFileThirdParty] invoke fakeApi.getUserListThirdParty",
    LOAD_FILE_THIRD_PARTY_REPLY_SUCCESS:
      "[FileRepository.loadFileThirdParty] reply {}",
    LOAD_FILE_THIRD_PARTY_REPLY_ERROR:
      "[FileRepository.loadFileThirdParty] error {}",
    LOAD_FILE_THIRD_PARTY_REPLY_RESULT:
      "[FileRepository.loadFileThirdParty] result {}",

    SAVE_FILE_THIRD_PARTY_INVOKE:
      "[FileRepository.saveFileThirdParty] invoke fakeApi.getUserListThirdParty",
    SAVE_FILE_THIRD_PARTY_REPLY_SUCCESS:
      "[FileRepository.saveFileThirdParty] reply {}",
    SAVE_FILE_THIRD_PARTY_REPLY_ERROR:
      "[FileRepository.saveFileThirdParty] error {}",
    SAVE_FILE_THIRD_PARTY_REPLY_RESULT:
      "[FileRepository.saveFileThirdParty] result {}",
  },
};
