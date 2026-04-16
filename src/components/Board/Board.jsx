import { useContext } from "react";
import "./Board.css"
import { Column } from "../Column/Column";
import { TaskContext } from "../../context/TaskContext";
import { STATUSES } from "../../utils/constants";
const Board = () => {
    const { tasks } = useContext(TaskContext);
    console.log(tasks);
    return (
        <> 
            <div className="board">
                {STATUSES.map(status => (
                    <Column key={status} id={status} tasks={tasks.filter(task => task.status === status)} />
                ))}
            </div>
        </>
    )
}

export default Board;