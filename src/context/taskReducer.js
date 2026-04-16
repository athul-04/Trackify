
export const tasksReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload]
        case "DELETE_TASK":
            return state
        case "UPDATE_TASK":
            return state
        default:
            return state
    }
}