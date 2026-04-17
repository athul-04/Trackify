import "./Column.css";
import TaskCard from "../TaskCard/TaskCard";
import { useDrop } from "react-dnd";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

export const Column = ({ id, tasks }) => {
    const { dispatch } = useContext(TaskContext);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => {
            dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id: item.id,
                    newStatus: id,
                },
            });
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
                backgroundColor: isOver ? "#f0f0f0" : "transparent",
            }}
        >
            <div className="column-header">
                <h2>{id}</h2>
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