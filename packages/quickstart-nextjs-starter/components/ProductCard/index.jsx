import PropTypes from 'prop-types';
import React from 'react';
import Image from 'next/image';

import styles from './ProductCard.module.css';

export const ProductCard = ({ category, code, price, title, images = [] }) => (
  <div key={code} className={styles.wrapper}>
    <div className={styles.imgWrapper}>
      <div className={styles.category}>{category}</div>
      <Image src={images[0]} />
    </div>
    <div className={styles.title}>
      <p>{title}</p>
    </div>
    <div className={styles.price}>
      <span></span>
      <span>{`$ ${price}`}</span>
    </div>
    <div className={styles.button}>
      <button>{'View Product'}</button>
    </div>
  </div>
);

ProductCard.propTypes = {
  category: PropTypes.string,
  code: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
  images: PropTypes.array,
};

export default ProductCard;
