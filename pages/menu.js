import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { Header } from "@components/elements";
import { ProductList, Sidebar } from "@components/templates";

const ProductsPage = ({ pizzaList }) => {
  const router = useRouter();

  const path = router.pathname.split("/")[1];

  return (
    <>
      <Head>
        <title>
          Our Products || Choose from multitude of customer favorite Pizza
        </title>
        <meta
          name="description"
          content="Choose from variety of Pizza's and order it from our platform"
        />
        <meta
          name="keywords"
          content="Popular Products, Menu, Pizza, Food, Food Delivery"
        />
      </Head>
      <div style={{ marginTop: "1rem" }}>
        <Header
          title="Our Menu"
          subtitle="Various Regional Taste"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tortor vitae purus faucibus ornare."
        />
      </div>
      <div style={{ padding: "2rem 1rem", display: "flex" }}>
        <Sidebar />
        <ProductList pizzaList={pizzaList} path={path} />
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      pizzaList: res.data,
    },
  };
};

export default ProductsPage;