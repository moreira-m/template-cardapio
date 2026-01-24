import styles from './Header.module.scss';
import Image from 'next/image';

interface HeaderProps {
    siteSettings: {
        siteName?: string;
        logo?: string;
        headerColor?: { hex: string };
    }
}

export default function Header({ siteSettings }: HeaderProps) {
    const { siteName, logo, headerColor } = siteSettings || {};

    const customStyle = headerColor ? { '--header-color': headerColor.hex } as React.CSSProperties : {};

    return (
        <header className={styles.header} style={customStyle}>
            <div className={styles.headerContent}>
                {logo && (
                    <Image
                        src={logo}
                        alt={siteName || 'Logo'}
                        width={100}
                        height={50}
                        className={styles.headerLogo}
                    />
                )}
                {siteName && <h1 className={styles.headerTitle}>{siteName}</h1>}
            </div>
        </header>
    );
}
