import React, { useContext } from 'react';
import Field from './Field';
import { TasksContext } from '../context/TasksContext';

export const SearchTaskForm = () => {
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form className='todo__form' onSubmit={(e) => e.preventDefault()}>
      <Field
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        className='todo__field'
        id='search-task'
        label='Search task'
        type='search'
      />
    </form>
  );
};
