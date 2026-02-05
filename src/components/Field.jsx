import React from 'react';

export default function Field({ label, type }) {
  return (
    <div className='todo__field field'>
      <label className='field__label' htmlFor='new-task'>
        New task
      </label>
      <input
        className='field__input'
        id='new-task'
        placeholder=' '
        autoComplete='off'
      />
    </div>
  );
}
