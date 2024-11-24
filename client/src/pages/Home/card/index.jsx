import styles from './Card.module.css';

function Card({ name, description, price, quantity, image }) {
    return (
        <section className={styles.card}>
            <div className={styles.title}>
                <h1 className={styles.name}>{name}</h1>
                {quantity > 0 ? (
                    <p className={styles.status}>new</p>
                ) : (
                    <p className={styles.statusOut}>Indisponível</p>
                )}
            </div>
            <div className={styles.divimage}>
                {image ? (
                    <img src={image} alt={name} className={styles.imagem} />
                ) : (
                    <div className={styles.placeholder}>Imagem indisponível</div>
                )}
                <div className={styles.details}>
                    <p className={styles.description}>{description}</p>
                </div>
            </div>
            <div className={styles.test}>
                <p className={styles.quantity}>Quantidade: {quantity}</p>
                <h3 className={styles.preco}>R$ {price}</h3>
            </div>
        </section>
    );
}

export default Card;
