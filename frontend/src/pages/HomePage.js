import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Select, MenuItem } from '@mui/material';
import todoService from '../services/todo-service';

export default function HomePage() {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            const todosResponse = await todoService.getTodos();
            setTodos(todosResponse.result.data);
        };
        fetchTodos();
    }, []);

    const handleAdd = async () => {
        const newTodo = await todoService.addTodo({ task: newTask, status: newStatus });
        if(newTodo.success){
            setTodos([...todos, newTodo.result.data]);
            setNewTask('');
            setNewStatus('');
        } else {
            alert("Something went wrong");
        }
    };

    const handleSave = async (index) => {
        const todo = todos[index];
        await todoService.updateTodo(todo.id, todo);
    };

    const handleDelete = async (index) => {
        const todo = todos[index];
        await todoService.deleteTodo(todo.id);
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div style={{ marginTop: "20px", width: "80%", margin: "auto"}}>
            <TableContainer>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell><TextField value={newTask} onChange={(e) => setNewTask(e.target.value)} /></TableCell>
                    <TableCell>
                    <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                        <MenuItem value="1">To do</MenuItem>
                        <MenuItem value="2">In Progress</MenuItem>
                        <MenuItem value="3">Done</MenuItem>
                    </Select>
                    </TableCell>
                    <TableCell><Button variant="contained" color="primary" onClick={handleAdd}>Add</Button></TableCell>
                </TableRow>
                {todos.map((todo, index) => (
                    <TableRow key={index}>
                    <TableCell>
                        <TextField 
                            value={todos[index].task} 
                            onChange={(e) => {
                                const newTodos = [...todos];
                                newTodos[index].task = e.target.value;
                                setTodos(newTodos);
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <Select 
                            value={todos[index].status} 
                            onChange={(e) => {
                                const newTodos = [...todos];
                                newTodos[index].status = e.target.value;
                                setTodos(newTodos);
                            }}
                        >
                            <MenuItem value="1">To do</MenuItem>
                            <MenuItem value="2">In Progress</MenuItem>
                            <MenuItem value="3">Done</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleSave(index)}>Save</Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDelete(index)}>Delete</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}
