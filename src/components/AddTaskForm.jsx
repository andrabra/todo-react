import { useContext, useState } from 'react';
import Button from './Button';
import Field from './Field';
import { TasksContext } from '../context/TasksContext';

export const AddTaskForm = () => {
  const { addTask, newTaskTitle, setNewTaskTitle, newTaskInputRef } =
    useContext(TasksContext);

  const [error, setError] = useState('');

  const clearNewTaskTitle = newTaskTitle.trim();
  const isNewTaskTitleEmpty = !clearNewTaskTitle.length;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isNewTaskTitleEmpty) addTask(clearNewTaskTitle);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const clearValue = value.trim();
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

    setNewTaskTitle(value);
    setError(hasOnlySpaces ? 'This field is required' : '');
  };

  return (
    <form className='todo__form' onSubmit={onSubmit}>
      <Field
        className='todo__field'
        id='new-task'
        label='New task title'
        ref={newTaskInputRef}
        value={newTaskTitle}
        error={error}
        onInput={handleInputChange}
      />
      <Button isDisabled={isNewTaskTitleEmpty} type='submit'>
        Add
      </Button>
    </form>
  );
};
