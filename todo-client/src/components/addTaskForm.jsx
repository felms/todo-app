import { useState } from "react";

const AddTaskForm = ({addTask}) => {
    const [description, setDescription] = useState([]);
    const [dueDate, setDueDate] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {
            description: description,
            dueDate: dueDate,
            completed: false
        };

        setDescription("");
        setDueDate("");

        addTask(task);
    };

    return (
        <div>
            <form className="add-task-form" onSubmit={handleSubmit}>
                <label>Task:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label>Due date:</label>
                <input type="date" className="task-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>

                <input type="submit" value="Add" className="btn"/>
            </form>
        </div>
    );
};

export default AddTaskForm;