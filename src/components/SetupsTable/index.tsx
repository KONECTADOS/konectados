import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useComputer } from '../../hooks/useComputer';
import styles from './styles.module.scss';
import Link from 'next/link';

export function SetupsTable({ setups }) {
  const { insertComponentIntoSetup } = useComputer();
  const router = useRouter()

  return (
    <section className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Preço</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {setups.map((setup, index) => {
            return (
              <tr key={index}>
                <td>{setup.email}</td>
                <td>{
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(setup.price)
                }</td>

                <td>
                  <Link href={`/dashboard/${setup.id}`} passHref>
                    <button>
                      Ver Setup
                    </button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  );
}