import { Carrousel } from "@/components";
import { ProcesadorPage, SectionPage, CasesPage } from ".";
import { Footer, Header, CategoriesList, Banner } from "@/components";

export const HomePage = () => {
  const images = [
    "BannerVentus.png",
    "Asus-intel.jpg",
    "bannerMSI.png",
    "BANNER_MONITOR.png",
    "BannerGigaByte.png",
  ];

  return (
    <>
      <Header />
      <main className="container">
        <Carrousel images={images} autoPlay={true} />
        <CategoriesList />
        <SectionPage />
        <Banner />
        <ProcesadorPage />
        <CasesPage />
      </main>
      <Footer />
    </>
  );
};
