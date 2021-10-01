import { Dispatch, SetStateAction, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import ReactHtmlParser from 'react-html-parser';

const customStyles = {
  content: {
    maxWidth: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    overflow:'hidden',
    marginRight: '-50%',
    background:"var(--black)",
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    padding: '0',
    zIndex: '999999',
  },
};

type ProductModalProps = {
  product: any, 
  isOpen: boolean;
  changeStateFunction: () => void;
}

export function ProductModal ({ product, isOpen, changeStateFunction }: ProductModalProps){
  function onRequestClose () {
    changeStateFunction()
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div className={styles.wrapper}>
        <header>
          <img src={product.images[0]} alt={product.description}  />
          { product.images[1] !== '' && (
            <img src={product.images[1]} className={styles.hiddenImg} alt={product.description}  />
          )}

        </header>

        <main>
          <h2>{product.description}</h2>
          <p>{ ReactHtmlParser(product.aditionalDescription) }</p>
          <span>{product.price}</span>

          <button type="button" onClick={onRequestClose}>Fechar</button>
        </main>
      </div>
    </Modal>
  )
}