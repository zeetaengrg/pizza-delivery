import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "redux/cartSlice";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";

import { AddToCartBtn, Ratings } from "@components/elements";
import { sizeItems } from "@data/size-data";
import styles from "./Product.module.scss";

const Product = ({ pizza }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [extraToppings, setExtraToppings] = useState([]);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const handlePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    handlePrice(difference);
  };

  const handleChange = (e, topping) => {
    const checked = e.target.checked;

    if (checked) {
      handlePrice(topping.price);
      setExtraToppings((prev) => [...prev, topping]);
    } else {
      handlePrice(-topping.price);
      setExtraToppings(
        extraToppings.filter((extra) => extra._id !== topping._id)
      );
    }
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        ...pizza,
        price,
        size,
        extraToppings,
        quantity,
        // totalPrice: price * quantity,
      })
    );
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
          <div className={styles.review}>
            <Ratings rating={pizza.rating} />
            <a href="#">({pizza.reviews} Reviews)</a>
          </div>
          <span className={styles.price}>$ {price.toFixed(2)}</span>
          <p className={styles.description}>{pizza.description}</p>
          <div className={styles.size}>
            <h2>Choose Your Size</h2>
            <div className={styles.size__wrapper}>
              {sizeItems.map((item) => (
                <div
                  className={styles.img__wrapper}
                  key={item.id}
                  onClick={() => handleSize(item.id - 1)}
                >
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
              {pizza.toppings.map((topping) => (
                <label key={topping._id} className={styles.box}>
                  <p>
                    {topping.text} (${topping.price})
                  </p>
                  <input
                    type="checkbox"
                    id={topping.text}
                    name={topping.text}
                    onChange={(e) => handleChange(e, topping)}
                  />
                  <span className={styles.checkmark}></span>
                </label>
              ))}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.counter}>
              <MdOutlineRemoveCircleOutline
                className={styles.count__btn}
                onClick={handleMinus}
              />
              <span
                className={styles.count__num}
                onChange={(e) => setQuantity(e.target.value)}
              >
                {quantity}
              </span>
              <MdAddCircleOutline
                className={styles.count__btn}
                onClick={handleAdd}
              />
            </div>
            <div className={styles.bottom__cart} onClick={handleAddToCart}>
              <AddToCartBtn text="Add To Cart" />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
export default Product;
