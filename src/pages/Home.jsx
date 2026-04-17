import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import { useReducer } from "react";
import { TaskContext } from "../context/TaskContext";
import { tasksReducer } from "../context/taskReducer";
import Footer from "../components/Footer/Footer";

const TASKS = [
    {
        id: 1,
        title: "Task 1",
        description: "Description for Task 1",
        status: "backlog"
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description for Task 2",
        status: "in-progress"
    },
    {
        id: 3,
        title: "Task 3",
        description: "Description for Task 3",
        status: "done"
    },
    {
        id: 4,
        title: "Task 4",
        description: "Description for Task 4",
        status: "review"
    },
    {
        id: 5,
        title: "Task 5",
        description: "Description for Task 5",
        status: "backlog"
    },
    {
        id: 6,
        title: "Task 6",
        description: "Description for Task 6",
        status: "review"
    }

]



const Home = () => {
    const [tasks, dispatch] = useReducer(tasksReducer,TASKS)
    return (
        <div>
            <TaskContext.Provider value={{ tasks, dispatch }}>
                <Header />
                <AddTaskForm />
                <Board />
                <Footer />
            </TaskContext.Provider>
        </div>
    )
}

export default Home;