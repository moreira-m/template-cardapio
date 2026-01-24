import React from "react";
import MenuSection from "@/components/MenuSection";

const sectionComponents: Record<string, React.ComponentType<any>> = {
    menuSection: MenuSection,
};

export default function RenderSections({ sections, carouselColors = [], buttonColors }: {
    sections: any[],
    carouselColors?: string[],
    buttonColors?: { primary: string; secondary: string }
}) {
    if (!sections || !Array.isArray(sections)) {
        return null;
    }

    return (
        <>
            {sections.map((section, index) => {
                const Component = sectionComponents[section._type];
                if (!Component) {
                    return (
                        <div key={section._key} style={{ padding: "20px", background: "#f0f0f0" }}>
                            Seção não implementada: <strong>{section._type}</strong>
                        </div>
                    );
                }

                const bgIndex = index % (carouselColors.length || 1);
                const backgroundColor = carouselColors[bgIndex];
                const theme = bgIndex === 0 ? 'light' : 'dark';

                const greenColor = carouselColors[1] || '';
                const beigeColor = carouselColors[0] || '';

                const textColor = theme === 'light' ? greenColor : beigeColor;
                const priceColor = buttonColors?.primary || '';

                return <Component
                    key={section._key}
                    {...section}
                    backgroundColor={backgroundColor}
                    theme={theme}
                    buttonColors={buttonColors}
                    textColor={textColor}
                    priceColor={priceColor}
                />;
            })}
        </>
    );
}
