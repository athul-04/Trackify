export const tasksReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];

        case "UPDATE_TASK":
            return state.map((task) =>
                task.id === action.payload.id
                    ? { ...task, status: action.payload.newStatus }
                    : task
            );

        default:
            return state;
    }
};