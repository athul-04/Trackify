export const tasksReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];

        case "UPDATE_TASK":
            return state.map((task) =>
                task.id === action.payload.id
                    ? { ...task, title: action.payload.title || task.title, description: action.payload.description || task.description, status: action.payload.newStatus || task.status }
                    : task
            );

        case "SET_TASKS":
            return action.payload;

        default:
            return state;
    }
};