import styles from './styles.module.scss';

export function Feedbacks({ feedbacks }) {
  return (
    <section className={styles.container} id="feedbacks">
      <h4>Feedbacks</h4>
      <div className={styles.feedbackWrapper}>
        {feedbacks[0] ? feedbacks.map(feedback => {
          const date = new Date(feedback.criadoEm);
          const criadoEm = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
          return (
            <div key={feedback.id} className={styles.feedback}>
              <span className={styles.quoteLeft}>&ldquo; </span>
              {console.log(feedback)}
              {feedback.feedback}
              <br/><time style={{fontSize: '.9rem'}}> Enviado em {criadoEm}</time>
              <span className={styles.quoteRight}> &ldquo;</span>
            </div>
          )
        }) : 'Sem Feedbacks cadastrados.'}
      </div>
    </section>
  );
}