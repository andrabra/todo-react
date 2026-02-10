import { useContext } from 'react';
import Button from './Button';
import Field from './Field';
import { TasksContext } from '../context/TasksContext';

export const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } = useContext(TasksContext);

  const onSubmit = (e) => {
    e.preventDefault();
    addTask(e.target.value);
  };

  const handleInputChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  return (
    <form className='todo__form' onSubmit={onSubmit}>
      <Field
        className='todo__field'
        id='new-task'
        label='New task title'
        ref={newTaskInputRef}
        value={newTaskTitle}
        onInput={handleInputChange}
      />
      <Button type='submit'>Add</Button>
    </form>
  );
};
