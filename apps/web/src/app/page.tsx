import styles from "./page.module.scss";
import { getHomePage } from "@/sanity/queries";
import RenderSections from "@/components/RenderSections";

export default async function Home() {
  const data = await getHomePage();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>{data.title}</h1>
        <RenderSections sections={data.sections} />
      </main>
    </div>
  );
}
