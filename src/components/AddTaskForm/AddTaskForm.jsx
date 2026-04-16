import "./AddTaskForm.css";
import { useState, useContext } from "react";
import {
    Box,
    Input,
    Textarea,
    Button,
    VStack,
    Heading,
} from "@chakra-ui/react";
import { TaskContext } from "../../context/TaskContext";

const AddTaskForm = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { dispatch } = useContext(TaskContext);

    const handleSubmit = () => {
        if (!title.trim()) return;

        dispatch({
            type: "ADD_TASK",
            payload: {
                id: Date.now(),
                title,
                description,
                status: "backlog",
            },
        });

        setTitle("");
        setDescription("");
        setFormVisible(false);
    };

    return (
        <>
            {/* Overlay */}
            {formVisible && (
                <div
                    className="overlay"
                    onClick={() => setFormVisible(false)}
                />
            )}

            {/* Modal Form */}
            {formVisible && (
                <Box
                    className="form"
                    onClick={(e) => e.stopPropagation()}
                >
                    <VStack spacing={5}>
                        <Heading size="md">Add Task</Heading>

                        <Input
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Textarea
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Button
                            colorScheme="teal"
                            width="100%"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>

                        <Button
                            variant="ghost"
                            width="100%"
                            onClick={() => setFormVisible(false)}
                        >
                            Cancel
                        </Button>
                    </VStack>
                </Box>
            )}

            {/* Add Task Button */}
            <div className="add-task-form">
                <div className="add-task-form-btn-container">
                    <Button onClick={() => setFormVisible(true)}>
                        Add Task
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AddTaskForm;