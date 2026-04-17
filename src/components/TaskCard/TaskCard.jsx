import "./TaskCard.css";
import { useDrag } from "react-dnd";
import { STATUSES, STATUSES_MAP } from "../../utils/constants";
import { Menu, X, Pencil } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { TaskContext } from "@/context/TaskContext";

const TaskCard = ({ id, title, description, status }) => {
    const { dispatch } = useContext(TaskContext);

    const [taskView, setTaskView] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isStatus, setIsStatus] = useState(false);
    // ✏️ Editable states
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);

    // Sync when modal opens
    useEffect(() => {
        if (taskView) {
            setEditTitle(title);
            setEditDescription(description);
            setIsEditing(false);
            setIsStatus(false);
        }
    }, [taskView, title, description]);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id, status },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const handleStatusChange = (newStatus) => {
        dispatch({
            type: "UPDATE_TASK",
            payload: { id, newStatus },
        });
    };

    // ✅ Update handler
    const handleUpdate = () => {
        dispatch({
            type: "UPDATE_TASK",
            payload: {
                id,
                title: editTitle,
                description: editDescription,

            },
        });
        setIsEditing(false);
    };

    return (
        <>
            {taskView && (
                <div
                    className="overlay"
                    onClick={() => setTaskView(false)}
                />
            )}

            {/* Modal */}
            {taskView && (
                <div
                    className="task-modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="task-modal-header">
                        <h2>Task Details</h2>

                        <div style={{ display: "flex", gap: "10px" }}>
                            {status==="backlog" && <Pencil
                                className="edit-icon"
                                onClick={() => setIsEditing(!isEditing)}
                            />}

                            {/* ❌ Close */}
                            <X
                                className="close-icon"
                                onClick={() => setTaskView(false)}
                            />
                        </div>
                    </div>

                    <div className="task-modal-body">
                        {/* Title */}
                        {isEditing ? (
                            <input
                                className="input"
                                value={editTitle}
                                onChange={(e) =>
                                    setEditTitle(e.target.value)
                                }
                            />
                        ) : (
                            <h3>{title}</h3>
                        )}

                        {/* Description */}
                        {isEditing ? (
                            <textarea
                                className="textarea"
                                value={editDescription}
                                onChange={(e) =>
                                    setEditDescription(e.target.value)
                                }
                            />
                        ) : (
                            <p>{description}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    {isEditing && (
                        <div className="task-modal-footer">
                            <button
                                className="update-btn"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditTitle(title);
                                    setEditDescription(description);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Task Card */}
            <div
                ref={drag}
                className="task-card"
                style={{ opacity: isDragging ? 0.5 : 1 }}
            >
                <div>
                    <div className="menubar">
                        <Menu
                            className="menu-icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsStatus(!isStatus);
                            }}
                            size={24}
                        />
                    </div>

                    <div className={isStatus ? "editing" : "hidden"}>
                        {STATUSES.map(
                            (item) =>
                                status !== item && (
                                    <p
                                        className="status-item"
                                        onClick={() =>
                                            handleStatusChange(item)
                                        }
                                        key={item}
                                    >
                                        {STATUSES_MAP[item]}
                                    </p>
                                )
                        )}
                    </div>
                </div>

                <div
                    style={{ opacity: isStatus ? 0.5 : 1 }}
                    onClick={() => setTaskView(true)}
                >
                    <h3
                        style={{
                            textDecoration:
                                status === "done"
                                    ? "line-through"
                                    : "none",
                        }}
                    >
                        {title}
                    </h3>
                </div>
            </div>
        </>
    );
};

export default TaskCard;