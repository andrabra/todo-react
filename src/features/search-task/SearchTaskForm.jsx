import React, {useContext} from 'react';
import Field from '@/shared/ui/Field';
import {TasksContext} from '@/entities/todo';

const SearchTaskForm = (props) => {
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

export default SearchTaskForm;
