import React from 'react';
import Field from './Field';

export const SearchTaskForm = (props) => {
  const { searchQuery, setSearchQuery } = props;

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
