import "./TaskCard.css";
import { useDrag } from "react-dnd";
import {STATUSES} from "../../utils/constants";
import { Menu } from 'lucide-react';
import { useState } from "react";
import { TaskContext } from "@/context/TaskContext";
import { useContext } from "react";
const TaskCard = ({ id, title, description, status }) => {
    const { dispatch } = useContext(TaskContext);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));


    const handleStatusChange = (newStatus) => {
        console.log(`Changing status of task ${id} to ${newStatus}`);
        dispatch({
            type:"UPDATE_TASK",
            payload:{
                id,
                newStatus
            }
        })
    };

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div
            ref={drag}
            className="task-card"
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div>
                <div className="menubar"><Menu className="menu-icon" onClick={()=>setIsEditing(!isEditing)} size={24}/></div>
                <div className={isEditing ? "editing" : "hidden"}>
                    {STATUSES.map((item) => status !== item && <p className="status-item" onClick={() => handleStatusChange(item)} key={item}>{item}</p>)}
                </div>
            </div>
            <div style={{ opacity: isEditing ? 0.5 : 1 }}>
                <h3 style={{ textDecoration: status === STATUSES[3] ? "line-through" : "none" }} >{title}</h3>
            </div>
        </div>
    );
};

export default TaskCard;