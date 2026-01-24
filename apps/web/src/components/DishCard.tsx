import styles from './DishCard.module.scss';
import Image from 'next/image';
import { urlFor } from '@/sanity/client';

export interface DishProps {
    name: string;
    description: string;
    price: number;
    image?: any;
    _key?: string;
    buttonColors?: { primary: string; secondary: string };
}

export default function DishCard({ name, description, price, image, buttonColors }: DishProps) {
    return (
        <article className={styles.card}>
            {image && (
                <div className={styles.cardImageContainer}>
                    <Image
                        src={urlFor(image).width(400).height(400).url()}
                        alt={name}
                        fill
                        className={styles.cardImage}
                    />
                </div>
            )}
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{name}</h3>
                <p className={styles.cardDescription}>{description}</p>

                <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                        <small style={{ fontSize: '0.6em', marginRight: '2px' }}>R$</small>
                        {price?.toFixed(2).replace('.', ',')}
                    </span>

                    <div className={styles.cardActions}>
                        <button
                            className={styles.cardButton}
                            aria-label="Ver detalhes"
                            style={{ background: buttonColors?.secondary || '', color: 'white' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 62 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="29" cy="29" r="25.5" stroke="#F2EADF" stroke-width="7" />
                                <path d="M46 48.5L58.5 61" stroke="#F2EADF" stroke-width="7" stroke-linecap="round" />
                            </svg>
                        </button>
                        <button
                            className={styles.cardButton}
                            aria-label="Adicionar"
                            style={{ background: buttonColors?.primary || '', color: 'white' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.5 3.5V48.5" stroke="#F2EADF" stroke-width="7" stroke-linecap="round" />
                                <path d="M48.5 25.5L3.5 25.5" stroke="#F2EADF" stroke-width="7" stroke-linecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
