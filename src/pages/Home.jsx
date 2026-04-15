import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
const Home=()=>{
    return (
        <div>
            <Header />
            <AddTaskForm />
            <Board />
        </div>
    )
}

export default Home;