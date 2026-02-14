import React, { useContext } from 'react';
import Field from '../Field/Field';
import { TasksContext } from '../../context/TasksContext';

export const SearchTaskForm = (props) => {
  const { styles } = props;
  const { searchQuery, setSearchQuery } = useContext(TasksContext);

  return (
    <form className={styles.todoForm} onSubmit={(e) => e.preventDefault()}>
      <Field
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        className={styles.todoField}
        id='search-task'
        label='Search task'
        type='search'
      />
    </form>
  );
};
