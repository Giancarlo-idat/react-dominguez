import { GridListItem } from "@/components";
import { useProductContext } from "@/context";

export const SectionPage = () => {
  const { products } = useProductContext();

  // Filtrar los productos por la categoría "Placas base"
  const motherBoardProducts = products.filter(
    (product) => product.categoria.nombre === "Placas base"
  );

  return <GridListItem title="Placas Madres" products={motherBoardProducts} />;
};



export const ProcesadorPage = () => {

  const { products } = useProductContext();

  // Filtrar los productos por la categoría "Procesadores"
  const procesadorProducts = products.filter(
    (product) => product.categoria.nombre === "Procesadores"
  );

  return <GridListItem title="Procesadores" products={procesadorProducts} />;

}


export const CasesPage = () => {
  
    const { products } = useProductContext();
  
    // Filtrar los productos por la categoría "Cases"
    const casesProducts = products.filter(
      (product) => product.categoria.nombre === "Cases"
    );
  
    return <GridListItem title="Cases" products={casesProducts} />;
}