import {
  ADDTASK,
  DELETETASK,
  GETTASKS,
  LOGIN,
  LOGINERROR,
  LOGOUT,
} from "./user.types";

const initState = {
  email: "",
  name: "",
  accessToken: "",
  refreshToken: "",
  authenticated: false,
  tasks: [],
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        email: payload.user.email,
        name: payload.user.name,
        accessToken: payload.token.accessToken,
        refreshToken: payload.token.refreshToken,
        authenticated: true,
      };
    }
    case LOGINERROR: {
      return initState;
    }
    case LOGOUT: {
      return initState;
    }
    case ADDTASK: {
      return { ...state, tasks: [...state.tasks, payload.task] };
    }
    case GETTASKS: {
      console.log("payload", payload);
      return { ...state, tasks: payload };
    }
    case DELETETASK: {
      let temp = state.tasks.filter((e) => e._id !== payload);
      return { ...state, tasks: temp };
    }
    default: {
      return state;
    }
  }
}
