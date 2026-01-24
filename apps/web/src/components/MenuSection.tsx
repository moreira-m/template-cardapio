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
    textColor?: string;
    priceColor?: string;
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
    buttonColors,
    textColor,
    priceColor
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

    const sectionStyle = {
        backgroundColor,
        '--card-text-color': textColor,
        '--price-color': priceColor,
        '--header-color': backgroundColor
    } as React.CSSProperties;

    return (
        <section className={styles.section} style={sectionStyle} data-theme={theme}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <h2 className={styles.title} style={{ color: textColor }}>{sectionName}</h2>
                </div>

                {enableFilter && (
                    <div className={styles.filters}>
                        {hasOmnivore && (
                            <button
                                onClick={() => setActiveTab('omnivore')}
                                className={`${styles.filterBtn} ${activeTab === 'omnivore' ? styles.active : ''}`}
                                aria-label="Tradicional"
                            >
                                <svg width="30" height="30" viewBox="0 0 74 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M62.979 46.8008C68.7896 40.6365 66.1054 27.6612 56.9838 17.8196C47.8622 7.97813 35.7573 4.9972 29.9467 11.1615C24.1362 17.3259 26.8203 30.3012 35.9419 40.1427C45.0636 49.9842 57.1685 52.9652 62.979 46.8008Z" stroke="#F2EADF" stroke-width="3" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M28.8678 13.0064C28.8678 13.0064 21.9433 20.4669 20.1372 30.3719C18.3311 40.2769 17.3277 42.862 15.5214 45.4448C13.7153 48.0299 14.518 54.0595 18.1304 57.7195C21.7428 61.3795 26.9615 62.0257 31.7779 59.4429C36.5922 56.8578 41.0091 56.6424 47.028 55.9961C53.049 55.3498 62.2802 47.5991 62.2802 47.5991" stroke="#F2EADF" stroke-width="3" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" fill="#006450" />
                                    <path d="M15.981 55.0063L9.58055 60.8843C9.58055 60.8843 3.73909 58.2395 1.83428 63.9435C-0.0705247 69.6497 6.78665 69.7894 6.78665 69.7894C6.78665 69.7894 6.53277 74.3828 10.4694 74.9392C14.4061 75.4956 16.9459 72.5738 15.0409 66.8676L21.1364 60.0485" stroke="#F2EADF" stroke-width="3" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" fill="#006450" />
                                    <path d="M52.0834 32.4341C53.4916 30.9401 52.8411 27.7954 50.6304 25.4102C48.4197 23.025 45.4859 22.3026 44.0777 23.7966C42.6694 25.2906 43.32 28.4353 45.5307 30.8204C47.7414 33.2056 50.6752 33.9281 52.0834 32.4341Z" stroke="#F2EADF" stroke-width="3" stroke-miterlimit="1.5" stroke-linecap="round" stroke-linejoin="round" fill="#006450" />
                                </svg>

                            </button>
                        )}
                        {hasVegetarian && (
                            <button
                                onClick={() => setActiveTab('vegetarian')}
                                className={`${styles.filterBtn} ${activeTab === 'vegetarian' ? styles.active : ''}`}
                                aria-label="Vegetariano"
                            >
                                <svg width="30" height="30" viewBox="0 0 79 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M47.1096 4.44942C47.1096 4.44942 20.6701 15.2867 16.3225 39.0942C11.9751 62.9017 38.2979 68.9718 38.2979 68.9718C38.2979 68.9718 37.5048 75.3417 35.2709 79.9504C35.2053 80.0817 35.1964 80.2341 35.2463 80.3721C35.296 80.5102 35.4004 80.6217 35.5347 80.6809C35.8237 80.8087 36.1796 80.9653 36.4506 81.0844C36.6731 81.1822 36.9335 81.1184 37.0856 80.9287C37.8896 79.3197 40.8291 70.774 42.651 29.3588C42.651 29.3588 43.1206 49.5795 40.8234 68.3561C40.8234 68.3561 55.2334 65.9828 60.7741 44.3553C66.3148 22.7276 47.1096 4.44942 47.1096 4.44942Z" fill="#006450" />
                                </svg>

                            </button>
                        )}
                        {hasVegan && (
                            <button
                                onClick={() => setActiveTab('vegan')}
                                className={`${styles.filterBtn} ${activeTab === 'vegan' ? styles.active : ''}`}
                                aria-label="Vegano"
                            >
                                <svg width="30" height="30" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.91415 8.349C5.91415 8.349 -5.66513 28.716 3.58088 46.2728C12.827 63.8294 32.8901 54.4277 32.8901 54.4277C32.8901 54.4277 35.4298 58.6501 36.4017 62.6403C36.4512 62.8632 36.589 63.0565 36.7836 63.1759C36.9783 63.2955 37.2131 63.3309 37.4343 63.2742C37.4476 63.2734 37.4601 63.2702 37.4727 63.2671C37.8174 63.1789 38.0709 62.8859 38.1088 62.5324C37.6199 60.6589 34.5724 53.1032 15.6464 26.6727C15.6464 26.6727 26.1859 39.4786 34.2085 52.7528C34.2085 52.7528 42.3081 43.9315 34.9357 27.1774C27.5633 10.4231 5.91415 8.349 5.91415 8.349Z" fill="#006450" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.6954 16.3993C39.4105 3.33427 59.1821 5.0146 59.1821 5.0146C59.1821 5.0146 66.9119 27.1284 54.6621 42.7431C49.282 49.6008 42.9014 51.0217 37.4367 50.4586C39.2459 46.6961 41.0636 39.7733 37.6292 29.8823C40.2388 27.242 43.1252 24.3846 46.3163 21.2967C46.3163 21.2967 42.5312 24.4963 37.4205 29.2956C37.0981 28.4098 36.7337 27.5007 36.3236 26.5686C34.4694 22.3534 31.7522 19.0243 28.6954 16.3993Z" fill="#006450" />
                                </svg>
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
