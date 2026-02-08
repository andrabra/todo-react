import Button from './Button';
import Field from './Field';

export const AddTaskForm = (props) => {
  const { addTask } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    addTask(e.target.value);
  };

  return (
    <form className='todo__form' onSubmit={onSubmit}>
      <Field className='todo__field' id='new-task' label='New task title' />
      <Button type='submit'>Add</Button>
    </form>
  );
};
