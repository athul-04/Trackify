import "./Column.css"
import TaskCard from "../TaskCard/TaskCard"
export const Column = ({id,tasks}) => {
    
    return (
        <>
            <div className="column">
                <div style={{ backgroundColor: "red" }}>
                    <h2>{ id }</h2>
                </div>
                <div className="column-content">
                    {tasks.map((task) => {
                        return <TaskCard key={task.id} title={task.title} description={task.description} />
                    })}
                </div>
            </div>
        </>
    )
}