import Button from './Button';
import Field from './Field';

export const AddTaskForm = (props) => {
  const { addTask, newTaskTitle, setNewTaskTitle } = props;

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
        value={newTaskTitle}
        onInput={handleInputChange}
      />
      <Button type='submit'>Add</Button>
    </form>
  );
};
