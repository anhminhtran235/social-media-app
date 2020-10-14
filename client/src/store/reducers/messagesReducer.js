import {
  FETCH_MESSAGES,
  NEW_MESSAGE,
  LOAD_CURRENT_MESSAGE_USER,
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
        }
        updatedFriendsWithMessages.push({ ...fwm });
      });
      return {
        ...state,
        friendsWithMessages: updatedFriendsWithMessages,
      };
    default:
      return state;
  }
};

export default reducer;
