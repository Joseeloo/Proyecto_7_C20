const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
