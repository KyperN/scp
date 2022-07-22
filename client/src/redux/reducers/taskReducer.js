const init = { tasks: [] };

export const taskReducer = (state = init, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'LOAD_TASKS': {
      return { ...state, tasks: [...action.payload] };
    }
    default: {
      return { ...state };
    }
  }
};
