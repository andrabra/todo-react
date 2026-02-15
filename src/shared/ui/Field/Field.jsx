import styles from './Field.module.scss';

function Field(props) {
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
    <div className={`${styles.field} ${className}`}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
      <input
        onChange={onInput}
        className={`${styles.fieldInput} ${error && styles.isInvalid}`}
        id={id}
        placeholder=' '
        autoComplete='off'
        type={type}
        value={value}
        ref={ref}
      />
      {error && (
        <span className={styles.fieldError} title={error}>
          {error}
        </span>
      )}
    </div>
  );
}

export default Field;
