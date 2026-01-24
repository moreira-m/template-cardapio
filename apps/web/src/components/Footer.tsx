import styles from './Footer.module.scss';
import Image from 'next/image';

interface SocialNetwork {
    platform: string;
    url: string;
    icon?: string;
}

interface FooterProps {
    siteSettings: {
        siteName?: string;
        logo?: string;
        footerColor?: { hex: string };
        socialNetworks?: SocialNetwork[];
    };
}

const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
        case 'instagram': return '/icons/instagram.svg';
        case 'facebook': return '/icons/facebook.svg';
        case 'whatsapp': return '/icons/whatsapp.svg';
        default: return '/icons/link.svg';
    }
}

export default function Footer({ siteSettings }: FooterProps) {
    const { siteName, logo, footerColor, socialNetworks } = siteSettings || {};

    const customStyle = footerColor
        ? ({ '--header-color': footerColor.hex } as React.CSSProperties)
        : {};

    return (
        <footer className={styles.footer} style={customStyle}>
            <div className={styles.footerContent}>
                <div className={styles.footerInfo}>
                    {logo && (
                        <Image
                            src={logo}
                            alt={siteName || 'Logo'}
                            width={120}
                            height={40}
                            className={styles.footerLogo}
                        />
                    )}
                    {siteName && <p className={styles.footerText}>&copy; {new Date().getFullYear()} {siteName}. Todos os direitos reservados.</p>}
                </div>

                {socialNetworks && socialNetworks.length > 0 && (
                    <div className={styles.footerSocials}>
                        {socialNetworks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.footerSocialLink}
                                aria-label={social.platform}
                            >
                                {social.icon ? (
                                    <Image
                                        src={social.icon}
                                        alt={social.platform}
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <span>{social.platform[0].toUpperCase()}</span>
                                )}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </footer>
    );
}
