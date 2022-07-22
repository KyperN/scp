const init = {
  userName: '',
  userId: '',
};

export const userReducer = (state = init, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN': {
      return {
        ...state,
        userName: action.payload.userName,
        userId: action.payload._id,
      };
    }
    case 'USER_LOGGED_OFF': {
      return { ...state, dateOfBirth: action.payload };
    }
    case 'CLASS_INPUT': {
      return { ...state, mainClass: action.payload.toLowerCase() };
    }

    default: {
      return { ...state };
    }
  }
};
