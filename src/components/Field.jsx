import React from 'react';

export default function Field(props) {
  const {
    className = '',
    id,
    label,
    type = 'text',
    ref,
    value,
    error,
    onInput,
  } = props;

  return (
    <div className={`field ${className}`}>
      <label className='field__label' htmlFor={id}>
        {label}
      </label>
      <input
        onChange={onInput}
        className={`field__input ${error && 'is-invalid'}`}
        id={id}
        placeholder=' '
        autoComplete='off'
        type={type}
        value={value}
        ref={ref}
      />
      {error && (
        <span className='field__error' title={error}>
          {error}
        </span>
      )}
    </div>
  );
}
