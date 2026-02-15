import {useContext, useState} from 'react';
import Button from '@/shared/ui/Button';
import Field from '@/shared/ui/Field';
import {TasksContext} from '@/entities/todo';

const AddTaskForm = (props) => {
  const { styles } = props;
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
    <form className={styles.todoForm} onSubmit={onSubmit}>
      <Field
        className={styles.todoField}
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

export default AddTaskForm;
