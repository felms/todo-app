import { useEffect, useState } from "react";

const TaskForm = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/api/tasks")
            .then((response) => response.json())
            .then(data => setTasks(data))
            .catch((err) => console.log(`Erro: ${err.message}`));
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={4}><pre>"Tarefas"</pre>
                </th></tr>
                <tr>
                    <td>Description</td>
                    <td>Creation Date</td>
                    <td>Due Date</td>
                    <td>Completed</td>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => {
                    return (
                    <tr key={task.id}>
                        <td>{task.description}</td>
                        <td>{task.creationDate}</td>
                        <td>{task.dueDate}</td>
                        <td>{task.completed}</td>
                    </tr>
                    );
                })}
            </tbody>
            
        </table>
    );


};

export default TaskForm
