import styles from "./page.module.scss";
import { getHomePage, getSiteSettings } from "@/sanity/queries";
import RenderSections from "@/components/RenderSections";

export default async function Home() {
  const data = await getHomePage();
  const settings = await getSiteSettings();

  const carouselColors = [
    settings?.carouselColor1?.hex,
    settings?.carouselColor2?.hex,
    settings?.carouselColor3?.hex,
  ].filter(Boolean) as string[];

  const buttonColors = {
    primary: settings?.buttonPrimaryColor?.hex,
    secondary: settings?.buttonSecondaryColor?.hex,
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <RenderSections
          sections={data.sections}
          carouselColors={carouselColors}
          buttonColors={buttonColors}
        />
      </main>
    </div>
  );
}