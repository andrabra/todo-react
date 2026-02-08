import React, { useState } from 'react';
import { AddTaskForm } from './AddTaskForm.jsx';
import { SearchTaskForm } from './SearchTaskForm.jsx';
import TodoInfo from './TodoInfo.jsx';
import TodoList from './TodoList.jsx';

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1', isDone: true },
    { id: '2', title: 'Task 2', isDone: false },
    { id: '3', title: 'Task 3', isDone: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const deleteAllTasks = () => {
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      setTasks([]);
    }
  };

  const deleteTask = (taskId) => {
    console.log('delete task with id', taskId);
  };

  const toggleTaskComplete = (taskId, isDone) => {
    console.log('toggle task with id', taskId, isDone);
  };

  const filterTasks = (query) => {
    console.log('search', query);
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  return (
    <div className='todo'>
      <h1 className='todo__title'>To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter((task) => task.isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;
