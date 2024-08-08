import React, { useState, useEffect } from 'react';

export const Form = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("task");
        try {
            const initialValue = JSON.parse(saved);
            return initialValue || [];
        } catch {
            return [];
        }
    });
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem("task", JSON.stringify(tasks));
    }, [tasks]);

    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !date || !description) {
            alert("Please fill in all fields");
            return;
        }

        const newTask = {
            name: title,
            date: date,
            description: description,
        };

        if (editIndex !== null) {
            const updatedTasks = tasks.map((task, index) => (
                index === editIndex ? newTask : task
            ));
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, newTask]);
        }

        setTitle('');
        setDate('');
        setDescription('');
    };

    const handleEdit = (index) => {
        const taskToEdit = tasks[index];
        setTitle(taskToEdit.name);
        setDate(taskToEdit.date);
        setDescription(taskToEdit.description);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        if (confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
            if (index === editIndex) {
                setTitle('');
                setDate('');
                setDescription('');
                setEditIndex(null);
            }
        }
    };

    return (
        <div className='main-container'>
            <h1 className='tasks'>Your tasks:</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr className="table-row">
                            <th>Task No.</th>
                            <th>Title</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Edit Task</th>
                            <th>Delete Task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{task.name}</td>
                                <td>{task.date}</td>
                                <td>{task.description}</td>
                                <td><button type="button" onClick={() => handleEdit(index)}>Edit</button></td>
                                <td><button type="button" onClick={() => handleDelete(index)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <form className="form-container" onSubmit={handleSubmit}>
                    <label><h2>{editIndex !== null ? `Update task ${editIndex + 1}` : 'Create New Task'}</h2></label>
                    <h4>
                        <label>Task name: </label>
                        <input
                            type="text"
                            className="formm"
                            placeholder="Enter task name"
                            value={title}
                            onChange={handleTitle}
                        />
                    </h4>
                    <h4>
                        <label>Task Date:</label>
                        <input
                            type="date"
                            className="formm"
                            placeholder="Enter task due date"
                            value={date}
                            onChange={handleDate}
                        />
                    </h4>
                    <h4>
                        <label>Description:</label>
                        <input
                            type="text"
                            className="formm"
                            placeholder="Enter task description"
                            value={description}
                            onChange={handleDescription}
                        />
                    </h4>
                    <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
};
