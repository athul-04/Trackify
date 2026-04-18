import AddTaskForm from "../components/AddTaskForm/AddTaskForm";
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import { useReducer,useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { tasksReducer } from "../context/taskReducer";
import Footer from "../components/Footer/Footer";
import { auth,db } from "../config/firebase"
import { collection } from "firebase/firestore";
import { query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const todosCollectionRef = collection(db, "todos");



const Home = () => {
    const [tasks, dispatch] = useReducer(tasksReducer,[])

    useEffect(() => {
        let unsubscribeSnapshot = null;

        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            // cleanup previous listener if any
            if (unsubscribeSnapshot) {
                unsubscribeSnapshot();
                unsubscribeSnapshot = null;
            }

            if (user) {
                const q = query(
                    todosCollectionRef,
                    where("userId", "==", user.uid)
                );

                unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                    const todos = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    dispatch({ type: "SET_TASKS", payload: todos });
                    console.log("Realtime todos:", todos);
                });

            } else {
                // user logged out
                dispatch({ type: "SET_TASKS", payload: [] });
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeSnapshot) unsubscribeSnapshot();
        };
    }, []);
    return (
        <div>
            <TaskContext.Provider value={{ tasks, dispatch, auth}}>
                <Header />
                <AddTaskForm />
                <Board />
                <Footer />
            </TaskContext.Provider>
        </div>
    )
}

export default Home;