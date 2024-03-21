import { Carrousel } from "@/components";
import { MotherBoardPage } from ".";

export const HomePage = () => {
  const images = ["Asus-23.jpg", "Asus-intel.jpg"];

  return (
    <>
      <main className="container-principal">
        <Carrousel images={images} autoPlay={true} />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
        <MotherBoardPage />
      </main>
    </>
  );
};
