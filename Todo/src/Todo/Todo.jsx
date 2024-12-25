import { useEffect, useState } from "react";
import "./Todo.css";
import { MdDeleteForever, MdEdit } from "react-icons/md";

export const Todo = () => {
    const [inputValue, setInputValue] = useState("");
    const [task, setTask] = useState([]);
    const [dateTime, setDateTime] = useState("");
    const [editIndex, setEditIndex] = useState(null); // Initialize the editIndex state

    // Handle input value changes
    const handleinputChange = (value) => {
        setInputValue(value);
    };

    // Handle form submit (Add or Edit task)
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!inputValue) return;

        // If editing, update the task at the editIndex
        if (editIndex !== null) {
            const updatedTasks = [...task];
            updatedTasks[editIndex] = inputValue;
            setTask(updatedTasks);
            setEditIndex(null); // Reset editIndex after updating
        } else {
            // If adding a new task
            if (task.includes(inputValue)) {
                setInputValue("");
                return;
            }
            setTask((prevTask) => [...prevTask, inputValue]);
        }

        setInputValue(""); // Clear input field after adding or editing
    };

    // Date and Time
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const Dates = now.toLocaleDateString();
            const Times = now.toLocaleTimeString();
            setDateTime(`${Dates} - ${Times}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Delete task
    const handlebuttondelete = (value) => {
        const updated = task.filter((curTask) => curTask !== value);
        setTask(updated);
    };

    // Clear all tasks
    const clearinputdata = () => {
        setTask([]);
    };

    // Edit task (set input field to the selected task for editing)
    const handleEdit = (index) => {
        setInputValue(task[index]); // Set the input value to the task being edited
        setEditIndex(index); // Set the editIndex to the task index
    };

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <h2>{dateTime}</h2>
            </header>
            <section className="form">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            type="text"
                            className="todo-input"
                            autoComplete="off"
                            value={inputValue}
                            onChange={(event) => handleinputChange(event.target.value)}
                        />
                    </div>

                    <button type="submit">
                        {editIndex !== null ? "Update Task" : "Add Task"}
                    </button>
                </form>
            </section>
            <section className="myUnOrdList">
                <ul>
                    {task.map((curTask, index) => (
                        <li key={index} className="todo-item">
                            <span>{curTask}</span>
                            <button className="edit-btn" onClick={() => handleEdit(index)}>
                                <MdEdit />
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => handlebuttondelete(curTask)}
                            >
                                <MdDeleteForever />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={clearinputdata}>
                    Clear History
                </button>
            </section>
        </section>
    );
};
