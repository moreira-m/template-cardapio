"use client";
import React, { useState } from "react";
import { urlFor } from "@/sanity/client";
import Image from "next/image";

interface MenuItem {
    name: string;
    description: string;
    price: number;
    image?: any;
    _key: string;
}

interface MenuSectionProps {
    sectionName: string;
    enableFilter?: boolean;
    items?: MenuItem[];
    itemsOmnivore?: MenuItem[];
    itemsVegetarian?: MenuItem[];
    itemsVegan?: MenuItem[];
}

type TabType = 'omnivore' | 'vegetarian' | 'vegan';

export default function MenuSection({
    sectionName,
    enableFilter = false,
    items,
    itemsOmnivore,
    itemsVegetarian,
    itemsVegan
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
        <section style={{ marginBottom: '40px' }}>
            <h2>{sectionName}</h2>

            {enableFilter && (
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    {hasOmnivore && (
                        <button
                            onClick={() => setActiveTab('omnivore')}
                            style={{ fontWeight: activeTab === 'omnivore' ? 'bold' : 'normal' }}
                        >
                            Tradicional 🥩
                        </button>
                    )}
                    {hasVegetarian && (
                        <button
                            onClick={() => setActiveTab('vegetarian')}
                            style={{ fontWeight: activeTab === 'vegetarian' ? 'bold' : 'normal' }}
                        >
                            Vegetariano 🧀
                        </button>
                    )}
                    {hasVegan && (
                        <button
                            onClick={() => setActiveTab('vegan')}
                            style={{ fontWeight: activeTab === 'vegan' ? 'bold' : 'normal' }}
                        >
                            Vegano 🥦
                        </button>
                    )}
                </div>
            )}

            <div>
                {displayedItems.length === 0 && <p>Nenhum item disponível.</p>}
                {displayedItems.map((item) => (
                    <div key={item._key} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0", display: "flex", gap: "10px" }}>
                        {item.image && (
                            <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                                <Image
                                    src={urlFor(item.image).width(160).url()}
                                    alt={item.name}
                                    fill
                                    style={{ objectFit: "cover", borderRadius: "8px" }}
                                />
                            </div>
                        )}
                        <div>
                            <h3 style={{ margin: "0 0 5px 0" }}>{item.name}</h3>
                            <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>{item.description}</p>
                            <strong style={{ display: "block", marginTop: "5px" }}>R$ {item.price?.toFixed(2)}</strong>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
