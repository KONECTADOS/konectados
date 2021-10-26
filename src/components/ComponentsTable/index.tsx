import { useRouter } from 'next/dist/client/router';
import { createRef, useState } from 'react';
import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';
import Image from 'next/image';
import { SkipComponentButton } from '../SkipComponentButton';

export function ComponentsTable({ products, componentName, onChoose, moreThanOne = false, handleOpenModal }) {
  const { insertComponentIntoSetup, setup } = useComputer();
  const router = useRouter()

  const [ListOfComponents, setListOfComponents] = useState(moreThanOne ? (setup[componentName] ? setup[componentName].ListOfComponents : []) : null)

  function handleChoseComponent(product?) {
    if (moreThanOne && product && ListOfComponents.length < 4) {
      const newListOfComponents = [...ListOfComponents];

      product && newListOfComponents.push(product)
      setListOfComponents(newListOfComponents)
      return
    }

    const totalPrice = moreThanOne
      ? [...ListOfComponents].reduce((ac, el, ind) => {
        return ac + (el.price * el.amount)
      }, 0)
      : product.price;

    insertComponentIntoSetup(
      componentName, moreThanOne ? {
        ListOfComponents,
        price: totalPrice,
        amount: ListOfComponents.length > 1 ? ListOfComponents.reduce((ac, el, index) => {
          if (typeof ac === 'number') return ac + el.amount
          console.log('ac', ac)
          return ac.amount + el.amount
        }) : ListOfComponents[0].amount
      } : product
    )
    router.push(onChoose.redirectTo)
  }

  function handleRemoveItemFromSetupList(index: number) {
    const newList = [...ListOfComponents];
    newList.splice(index, 1);

    setListOfComponents(newList)
  }

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Foto do produto</th>
            <th>Componente</th>
            {products[0].cpuSocket && (<th>Soquete</th>)}
            {products[0].ramSocket && (<th>Soquete</th>)}
            {products[0].socketCompatibility && (<th>Compatibilidade</th>)}
            {(products[0].sizeInGb || products[0].ramSizeInGb || products[0].vRamSizeInGb) && (<th>Memória</th>)}
            {products[0].frequencyInMhz && (<th>Frequência</th>)}
            {products[0].powerInWatts && (<th>Potência</th>)}
            {products[0].graphicCardSizeInCm && (<th>Tamanho (cm)</th>)}
            {products[0].cabinetSizeInCm && (<th>Tamanho (cm)</th>)}
            <th>Preço</th>
            {moreThanOne && (<th></th>)}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products[0] ? products.map((product, index) => {
            return (
              <ProductItem
                product={product}
                componentName={componentName}
                key={index}
                handleOpenModal={handleOpenModal}
                redirectTo={onChoose.redirectTo}
                moreThanOne={moreThanOne}
                listOfComponents={{ components: ListOfComponents || null, setComponents: setListOfComponents || null }}
              />
            )
          }) : (
            <h2>Ops! Estamos sem esse produto em estoque.</h2>
          )}
        </tbody>
      </table>

      {moreThanOne && (
        <div className={styles.listOfItems}>
          <ul>
            {ListOfComponents?.map((el, index) => {
              return (
                <li key={index}>
                  <Image width="24px" height="24px" src="/icons/removeItem.svg" alt="" onClick={e => handleRemoveItemFromSetupList(index)} />
                  {componentName === 'ramMemory' 
                    ? el.amount * el.ramSizeInGb 
                    : (el.sizeInGb ? `${el.amount * el.sizeInGb} Gb |` : '')} {el.amount}x • {el.description} • {
                    new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(el.price)
                  }
                </li>
              )
            })}
          </ul>

          {
            ListOfComponents[0] ?
              (<button type="button" className={styles.advance} onClick={e => {
                handleChoseComponent()
              }}>
                Avançar
              </button>) : (<></>)
          }

          {
            !ListOfComponents || !ListOfComponents[0] && componentName !== 'ramMemory' && (
              // <Link href={onChoose.redirectTo} passHref>
              //   <button className={styles.skipButton}>
              //     Pular
              //   </button>
              // </Link>
              <SkipComponentButton
                componentToSkip={componentName}
                nextComponent={onChoose.redirectTo.replace('/montagem/', '')}
              />
            )
          }
        </div>
      )}
    </section>
  );
}


function ProductItem({ product, componentName, redirectTo, moreThanOne, listOfComponents, handleOpenModal }) {
  const { insertComponentIntoSetup, setup } = useComputer();
  const router = useRouter();
  const [amount, setAmount] = useState(1);

  const buttonRef = createRef<HTMLButtonElement>();

  const [max, setMax] = useState(product.stock);

  if (componentName === 'motherboard') {
    if (setup.cpu?.cpuSocket !== product.cpuSocket) return null
    
    if(setup.cpu?.cpuGenCompatibility.indexOf(product.cpuSocketGen) === -1) return null
  }
  if (componentName === 'ramMemory') {
    if (setup.motherboard?.ramSocket !== product.ramSocket) return null
  }
  if (componentName === 'waterCooler') {
    if (product.socketCompatibility[0] !== 'Universal' && !product.socketCompatibility?.includes(setup.cpu?.cpuSocket)) return null
  }

  if (componentName === 'pcCabinet') {
    if (setup.graphicCard?.graphicCardSizeInCm > product.cabinetSizeInCm) {
      // console.log(setup, product.cabinetSizeInCm)
    }
  }

  if(componentName === 'SSD'){
    if(!setup.motherboard?.isCompatibleWithMTwo){
      if(product.description.includes('M.2')) return null;
    }
  }

  function handleChoseComponent() {
    if (moreThanOne) {
      product.amount = amount
      const newListOfComponents = [...listOfComponents.components];
      product.totalPrice = newListOfComponents ? newListOfComponents.reduce((ac, el, index) => {
        return ac + (el.price * el.amount)
      }, 0) : product.price * product.amount

      // console.log(product)
      newListOfComponents.push(product);
      listOfComponents.setComponents(newListOfComponents)
      setMax(max - amount)
      return
    }
    insertComponentIntoSetup(componentName, product)
    router.push(redirectTo)
  }

  return (
    <tr>
      <td onClick={(e) => handleOpenModal(product)}>
        <div className={styles.productImage}>
          <img width="160px" height="160px" src={product.images[0]} alt={product.description} />
          { product.images[1] !== '' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img width="160px" height="160px" src={product.images[1]} className={styles.hiddenImg} alt={product.description} />
          ) : (<></>)}
        </div>
      </td>
      <td onClick={(e) => handleOpenModal(product)}>{product.description}</td>
      {product.cpuSocket && (<td onClick={(e) => handleOpenModal(product)}>{product.cpuSocket}</td>)}
      {product.ramSocket && (<td onClick={(e) => handleOpenModal(product)}>{product.ramSocket}</td>)}
      {product.ramSizeInGb && (<td onClick={(e) => handleOpenModal(product)}>{product.ramSizeInGb} Gb</td>)}
      {product.sizeInGb && (<td onClick={(e) => handleOpenModal(product)}>{product.sizeInGb} Gb</td>)}
      {product.vRamSizeInGb && (<td onClick={(e) => handleOpenModal(product)}>{product.vRamSizeInGb} Gb</td>)}
      {product.powerInWatts && (<td onClick={(e) => handleOpenModal(product)}>{product.powerInWatts}W</td>)}
      {product.frequencyInMhz && (<td onClick={(e) => handleOpenModal(product)}>{product.frequencyInMhz} Mhz</td>)}
      {product.socketCompatibility && (<td onClick={(e) => handleOpenModal(product)}>{product.socketCompatibility.join(', ')}</td>)}
      {product.graphicCardSizeInCm && (<td onClick={(e) => handleOpenModal(product)}>{product.graphicCardSizeInCm} cm</td>)}
      {product.cabinetSizeInCm && (<td>{product.cabinetSizeInCm} cm</td>)}
      <td  onClick={(e) => handleOpenModal(product)} className={styles.priceRow}>{
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(product.price)
      }</td>
      {moreThanOne && (
        <td style={{ textAlign: 'right' }}>
          <div className={styles.inputWrapper}>
            <input type="number" value={amount} min={1} max={max < 4 ? max : 4} onChange={e => setAmount(Number(e.target.value))} />
            <button className={styles.plus} onClick={e => amount < 4 && setAmount(amount + 1)}>
              <Image width="20px" height="20px" src="/icons/plus.svg" alt="" />
            </button>
            <button className={styles.minus} onClick={e => amount > 1 && setAmount(amount - 1)}>
              <Image width="20px" height="20px" src="/icons/minus.svg" alt="" />
            </button>
          </div>
        </td>
      )}
      <td>
        <button type="button" ref={buttonRef} onClick={handleChoseComponent}>
          Selecionar
          {/* {moreThanOne && ListOfComponents?.length === maxItems ? 'Avançar' : 'Escolher'} */}
        </button>
      </td>
    </tr>
  )
}