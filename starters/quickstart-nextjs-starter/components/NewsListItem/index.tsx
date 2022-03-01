import { INews } from '@entando-webui/ootb-components';
import React from 'react';

import styles from './NewsListItem.module.css';

export const NewsListItem = (props: INews) => {
  const { image, category, date, title, abstract } = props;
  return (
    <article
      className="w"
    >
      {image && (
        <div className={styles.newsImage}>
          <img className={styles.newsImageChild} src={image} />
        </div>
      )}
      <div className={styles.newsAbstract}>
        <div className={styles.newsAbstractChild}>
          {category && <h3 className={styles.newsCategory}>{category}</h3>}
          <time className={styles.newsDate} dateTime={date}>
            {date}
          </time>
          <h1 className={styles.newsTitle}>
            <a href="#">{title}</a>
          </h1>
          <div dangerouslySetInnerHTML={{__html: abstract}}></div>
        </div>
      </div>
    </article>
  );
};
