import { useEffect, useState } from "react";
import { MdGridView, MdMenu } from "react-icons/md";
import { ProductCard } from "@components/elements";
import { HorizontalProductCard } from "@components/templates";
import styles from "./ProductList.module.scss";

const ProductList = ({ pizzaList }) => {
  const [sort, setSort] = useState("Lowest");
  const [isGrid, setIsGrid] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(pizzaList);

  useEffect(() => {
    const sortProducts = () => {
      if (sort === "lowest") {
        return setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.prices[0] - b.prices[0])
        );
      } else if (sort === "highest") {
        return setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.prices[0] - a.prices[0])
        );
      } else if (sort === "ascending") {
        return setFilteredProducts((prev) =>
          [...prev].sort((a, b) => a.title.localeCompare(b.title))
        );
      } else if (sort === "descending") {
        return setFilteredProducts((prev) =>
          [...prev].sort((a, b) => b.title.localeCompare(a.title))
        );
      }
    };
    sortProducts();
  }, [sort]);

  return (
    <div className={styles.container}>
      <section className={styles.top}>
        <div className={styles.icons__container}>
          <MdGridView
            className={isGrid ? styles.active : styles.inactive}
            onClick={() => setIsGrid(true)}
          />
          <MdMenu
            className={isGrid ? styles.inactive : styles.active}
            onClick={() => setIsGrid(false)}
          />
          <p>{filteredProducts.length} Products Available</p>
        </div>
        <div className={styles.sort__container}>
          <p>Sort by:</p>
          <select
            name="price"
            onChange={(e) => setSort(e.target.value)}
            defaultValue="lowest"
          >
            <option value="lowest">Price (Lowest)</option>
            <option value="highest">Price (Highest)</option>
            <option value="ascending">Name (Ascending)</option>
            <option value="descending">Name (Descending)</option>
          </select>
        </div>
      </section>
      {isGrid ? (
        <section className={styles.products__grid}>
          {filteredProducts.map((pizza) => (
            <ProductCard pizza={pizza} key={pizza._id} {...pizza} />
          ))}
        </section>
      ) : (
        <section className={styles.products__line}>
          {filteredProducts.map((pizza) => (
            <HorizontalProductCard pizza={pizza} key={pizza._id} {...pizza} />
          ))}
        </section>
      )}
    </div>
  );
};

export default ProductList;
