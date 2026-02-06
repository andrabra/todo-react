import React from 'react';
import Field from './Field';

export const SearchTaskForm = () => {
  return (
    <form className='todo__form'>
      <Field
        className='todo__field'
        id='search-task'
        label='Search task'
        type='search'
      />
    </form>
  );
};
