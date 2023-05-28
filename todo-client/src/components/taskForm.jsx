const TaskForm = ({allTasks, updateTask, toggleVisible}) => {

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})
    };

    const handleChecked = (e) => {
        const id = e.target.id;
        let task = allTasks.filter(task => task.id == id)[0];
        const updatedTsk = {...task, completed: !task.completed};
        
        updateTask(id, updatedTsk); 
    };

    const handleClicked = () => {
        toggleVisible();
    };

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={4}><pre>Tasks</pre>
                </th></tr>
                <tr>
                    <td>Description</td>
                    <td>Creation Date</td>
                    <td>Due Date</td>
                    <td>Completed</td>
                </tr>
            </thead>
            <tbody>
                {allTasks.map((task) => {
                    return (
                    <tr key={task.id}>
                        <td>{task.description}</td>
                        <td>{formatDate(task.creationDate)}</td>
                        <td>{formatDate(task.dueDate)}</td>
                        <td><input type="checkbox" id={task.id} name={`checkBox${task.id}`} checked={task.completed} onChange={handleChecked}></input></td>
                    </tr>
                    );
                })}
                <tr colSpan={4}><td colSpan={4}> <button type="button" className="btn" onClick={handleClicked}>Add Task</button></td></tr>
            </tbody>
            
        </table>
    );

};

export default TaskForm;
