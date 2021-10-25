import { useState } from "react";
import Image from 'next/image'
import { useComponent } from "../../hooks/useComponent";
import styles from './styles.module.scss';

export function EditProductTable({ components }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>

        <tbody>
          {components.map((el, index) => {
            return (
              <ComponentTr component={el} key={el.skuCode} />
            )
          })}
        </tbody>
      </thead>
    </table>
  );
}

function ComponentTr({ component }) {
  const [price, setPrice] = useState<number>(component.price);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { setComponentIntoList } = useComponent()

  async function fetchData() {
    const newComponent = { ...component };
    newComponent.price = price

    setComponentIntoList(newComponent)
    setIsEditing(false)
  }

  return (
    <tr className={styles.component}>
      <td>{component.description}</td>
      <td>
        {'R$ '}
        <input
          type="number"
          step="0.01"
          value={price.toFixed(2)}
          onChange={e => setPrice(Number(e.target.value))}
          disabled={!isEditing}
        />
      </td>
      <td>
        <button className={styles.edit} onClick={e => setIsEditing(!isEditing)}>
          <Image width="24px" height="24px" src="/icons/edit.svg" alt="" />
        </button>
        <button onClick={fetchData} disabled={!isEditing}>
          Atualizar
        </button>
      </td>
    </tr>
  );
}