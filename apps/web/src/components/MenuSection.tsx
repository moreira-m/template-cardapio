"use client";
import React, { useState } from "react";
import DishCard, { DishProps } from "./DishCard";
import styles from "./MenuSection.module.scss";

interface MenuSectionProps {
    sectionName: string;
    enableFilter?: boolean;
    items?: DishProps[];
    itemsOmnivore?: DishProps[];
    itemsVegetarian?: DishProps[];
    itemsVegan?: DishProps[];
    backgroundColor?: string;
    theme?: 'light' | 'dark';
    buttonColors?: { primary: string; secondary: string };
}

type TabType = 'omnivore' | 'vegetarian' | 'vegan';

export default function MenuSection({
    sectionName,
    enableFilter = false,
    items,
    itemsOmnivore,
    itemsVegetarian,
    itemsVegan,
    backgroundColor,
    theme = 'light',
    buttonColors
}: MenuSectionProps) {
    const safeItems = items || [];
    const safeOmnivore = itemsOmnivore || [];
    const safeVegetarian = itemsVegetarian || [];
    const safeVegan = itemsVegan || [];

    const [activeTab, setActiveTab] = useState<TabType>('omnivore');

    const hasOmnivore = safeOmnivore.length > 0;
    const hasVegetarian = safeVegetarian.length > 0;
    const hasVegan = safeVegan.length > 0;

    const getActiveItems = () => {
        if (!enableFilter) {
            return safeItems;
        }
        switch (activeTab) {
            case 'vegetarian': return safeVegetarian;
            case 'vegan': return safeVegan;
            default: return safeOmnivore;
        }
    };

    const displayedItems = getActiveItems();

    return (
        <section className={styles.section} style={{ backgroundColor }} data-theme={theme}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.title}>{sectionName}</h2>
                </div>

                {enableFilter && (
                    <div className={styles.filters}>
                        {hasOmnivore && (
                            <button
                                onClick={() => setActiveTab('omnivore')}
                                className={`${styles.filterBtn} ${activeTab === 'omnivore' ? styles.active : ''}`}
                                aria-label="Tradicional"
                            >
                                🥩
                            </button>
                        )}
                        {hasVegetarian && (
                            <button
                                onClick={() => setActiveTab('vegetarian')}
                                className={`${styles.filterBtn} ${activeTab === 'vegetarian' ? styles.active : ''}`}
                                aria-label="Vegetariano"
                            >
                                🧀
                            </button>
                        )}
                        {hasVegan && (
                            <button
                                onClick={() => setActiveTab('vegan')}
                                className={`${styles.filterBtn} ${activeTab === 'vegan' ? styles.active : ''}`}
                                aria-label="Vegano"
                            >
                                🥦
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className={styles.carousel}>
                {displayedItems.length === 0 && <p style={{ paddingLeft: '1.5rem' }}>Nenhum item disponível.</p>}
                {displayedItems.map((item) => (
                    <DishCard
                        key={item._key}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        buttonColors={buttonColors}
                    />
                ))}
            </div>
        </section>
    );
}
