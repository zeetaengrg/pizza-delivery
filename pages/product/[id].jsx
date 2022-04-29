import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";

import { AddToCartBtn, Ratings } from "@components/elements";
import { sizeItems } from "@data/size-data";
import styles from "./Product.module.scss";

const Product = () => {
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(1);
    }
  };

  const pizza = {
    id: 1,
    title: "Prosciutto E Unghi Pizza",
    img: "/images/Prosciutto-e-unghi-pizza.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    toppings: ["Prosciutto", "Parmigiano", "Tomato Sauce", "Mushroom"],
    price: 12.99,
    rating: 4.5,
  };

  return (
    <>
      <Head>
        <title>
          {pizza.title} || {pizza.description}
        </title>
        <meta name="description" content={pizza.description} />
        <meta
          name="keywords"
          content={`PizzaLand, Pizza, Pizza Delivery, ${pizza.title}`}
        />
      </Head>
      <section className={styles.container}>
        <figure className={styles.container__left}>
          <Image
            src={pizza.img}
            alt={pizza.title}
            height="500"
            width="500"
            priority
          />
        </figure>
        <article className={styles.container__right}>
          <h1>{pizza.title}</h1>
          <Ratings rating={pizza.rating} />
          <span className={styles.price}>$ {pizza.price}</span>
          <p>{pizza.description}</p>
          <div className={styles.size}>
            <h2>Choose Your Size</h2>
            <div className={styles.size__wrapper}>
              {sizeItems.map((item) => (
                <div className={styles.img__wrapper} key={item.id}>
                  <figure className={styles.img}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      height={item.height}
                      width={item.width}
                    />
                  </figure>
                  <figcaption className={styles.info}>
                    <p className={styles.info__title}>{item.title}</p>
                  </figcaption>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.toppings}>
            <h2>Add Extra Toppings</h2>
            <div className={styles.toppings__wrapper}>
              {pizza.toppings.map((item) => (
                <label key={item} className={styles.box}>
                  <p>{item}</p>
                  <input type="checkbox" />
                  <span className={styles.checkmark}></span>
                </label>
              ))}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottom__counter}>
              <MdOutlineRemoveCircleOutline
                className={styles.count__btn}
                onClick={handleMinus}
              />
              <span className={styles.count__num}>{count}</span>
              <MdAddCircleOutline
                className={styles.count__btn}
                onClick={handleAdd}
              />
            </div>
            <div className={styles.bottom__cart}>
              <AddToCartBtn />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
export default Product;