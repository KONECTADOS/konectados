import styles from './styles.module.scss';

export function Feedbacks({ feedbacks }) {
  return (
    <section className={styles.container} id="feedbacks">
      <h4>Feedbacks</h4>
      {feedbacks.map(feedback => (
        <div key={feedback.id} className={styles.feedback}>
          <span className={styles.quoteLeft}>&ldquo; </span>
          {feedback.feedback}
          <span className={styles.quoteRight}> &ldquo;</span>
        </div>
      ))}
    </section>
  );
}