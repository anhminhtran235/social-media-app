import {
  FETCH_MESSAGES,
  NEW_MESSAGE,
  LOAD_CURRENT_MESSAGE_USER,
  CLEAR_DATA,
  MARK_READ_CONVERSATION,
} from '../actionTypes';

const initialState = {
  friendsWithMessages: null,
  currentlyViewingUserId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return {
        ...state,
        friendsWithMessages: action.payload,
      };
    case LOAD_CURRENT_MESSAGE_USER:
      return {
        ...state,
        currentlyViewingUserId: action.payload,
      };
    case NEW_MESSAGE:
      const newMessage = action.payload.message;
      const fromMe = action.payload.fromMe;
      const updatedFriendsWithMessages = [];
      state.friendsWithMessages.forEach((fwm) => {
        if (
          (fromMe && fwm._id === newMessage.toUserId) ||
          (!fromMe && fwm._id === newMessage.fromUserId)
        ) {
          fwm.messages.push(newMessage);
          if (fromMe) {
            fwm.read = true;
          } else {
            fwm.read = false;
          }
        }
        updatedFriendsWithMessages.push({ ...fwm });
      });
      return {
        ...state,
        friendsWithMessages: updatedFriendsWithMessages,
      };
    case MARK_READ_CONVERSATION:
      const updatedFwm = [];
      const otherUserId = action.payload;
      state.friendsWithMessages.forEach((fwm) => {
        const cloneFwm = { ...fwm };
        if (cloneFwm._id === otherUserId) {
          cloneFwm.messages.forEach((message) => {
            message.read = true;
          });
          cloneFwm.read = true;
        }
        updatedFwm.push(cloneFwm);
      });
      return {
        ...state,
        friendsWithMessages: updatedFwm,
      };
    case CLEAR_DATA:
      return {
        friendsWithMessages: null,
        currentlyViewingUserId: null,
      };
    default:
      return state;
  }
};

export default reducer;
