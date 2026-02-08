import React from 'react';
import Field from './Field';

export const SearchTaskForm = (props) => {
  const { onSearchInput } = props;
  return (
    <form className='todo__form'>
      <Field
        className='todo__field'
        id='search-task'
        label='Search task'
        type='search'
        onInput={(e) => onSearchInput(e.target.value)}
      />
    </form>
  );
};
