import "./TaskCard.css";
import { useDrag } from "react-dnd";

const TaskCard = ({ id, title, description, status }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className="task-card"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default TaskCard;