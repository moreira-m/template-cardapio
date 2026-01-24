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
                        {/* Search/Details Icon */}
                        <button
                            className={styles.cardButton}
                            aria-label="Ver detalhes"
                            style={{ background: buttonColors?.secondary || '#004D40', color: 'white' }}
                        >
                            🔍
                        </button>
                        {/* Add Icon */}
                        <button
                            className={styles.cardButton}
                            aria-label="Adicionar"
                            style={{ background: buttonColors?.primary || '#ff7e41', color: 'white' }}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
