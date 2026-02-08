import React from 'react';

export default function Field(props) {
  const {
    className = '',
    id,
    label,
    type = 'text',
    onInput,
    value,
    ref,
  } = props;

  return (
    <div className={`field ${className}`}>
      <label className='field__label' htmlFor={id}>
        {label}
      </label>
      <input
        onChange={onInput}
        className='field__input'
        id={id}
        placeholder=' '
        autoComplete='off'
        type={type}
        value={value}
        ref={ref}
      />
    </div>
  );
}
