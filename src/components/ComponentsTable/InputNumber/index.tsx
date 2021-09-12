import { useState } from 'react';
import styles from './styles.module.scss';

export function InputNumber() {
  const [value, setValue] = useState(1);

  function handleInputChange(value: string) {
    const valueNumber = Number(value);
    
  }

  return (
    <div className={styles.inputWrapper}>
      <input value={value} onChange={e => handleInputChange(e.target.value)} type="text" />
      <button>+</button>
      <button>-</button>
    </div>
  )
}