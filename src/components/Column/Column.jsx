import "./Column.css"
import TaskCard from "../TaskCard/TaskCard"
export const Column = () => {
    
    return (
        <>
            <div className="column">
                <div style={{ backgroundColor: "red" }}>
                    <h2>Column Title</h2>
                </div>
                <div className="column-content">

                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                </div>
            </div>
        </>
    )
}