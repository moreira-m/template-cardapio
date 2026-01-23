import React from "react";
import MenuSection from "@/components/MenuSection";

const sectionComponents: Record<string, React.ComponentType<any>> = {
    menuSection: MenuSection,
};

export default function RenderSections({ sections }: { sections: any[] }) {
    if (!sections || !Array.isArray(sections)) {
        return null;
    }

    return (
        <>
            {sections.map((section) => {
                const Component = sectionComponents[section._type];
                if (!Component) {
                    return (
                        <div key={section._key} style={{ padding: "20px", background: "#f0f0f0" }}>
                            Seção não implementada: <strong>{section._type}</strong>
                        </div>
                    );
                }
                return <Component key={section._key} {...section} />;
            })}
        </>
    );
}
