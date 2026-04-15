
import "./Board.css"
import { Column } from "../Column/Column";
const Board = () => {
    return (
        <> 
            <div className="board">
                <Column id="backlog" />
                <Column id="in-progress" />
                <Column id="review" />
                <Column id="done" />
            </div>
        </>
    )
}

export default Board;