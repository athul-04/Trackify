import "./Column.css";
import TaskCard from "../TaskCard/TaskCard";
import { useDrop } from "react-dnd";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import {STATUSES_MAP} from "../../utils/constants";
import { doc, updateDoc } from "firebase/firestore";
import {db} from "../../config/firebase";
export const Column = ({ id, tasks }) => {
    const { dispatch } = useContext(TaskContext);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: async (item) => {
            // dispatch({
            //     type: "UPDATE_TASK",
            //     payload: {
            //         id: item.id,
            //         newStatus: id,
            //     },
            // });
            try{
                const taskRef = doc(db, "todos", item.id);
                await updateDoc(taskRef, {
                    status: id,
                });
            }catch(err){
                console.error("Error updating task status:", err);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className="column"
            style={{
                backgroundColor: isOver ? "var(--bg)" : "transparent",
            }}
        >
            <div className="column-header">
                <h2>{STATUSES_MAP[id]}</h2>
            </div>

            <div className="column-content">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
                    />
                ))}
            </div>
        </div>
    );
};