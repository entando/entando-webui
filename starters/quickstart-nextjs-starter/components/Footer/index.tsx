import React from 'react';
import Image from 'next/image';

import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.wrapper}>
      {'Powered by '}
      <a href="https://entando.com/" target="_blank" rel="noopener noreferrer">
        <Image src="/entando-dark-logo.svg" alt="Entando" width="80" height="80" />
      </a>
      <br />
      <small className="text-muted">
        Repo:&nbsp;
        <a href="https://github.com/entando/entando-quickstart-webui-starter">
          https://github.com/entando/entando-quickstart-webui-starter
        </a>
      </small>
    </footer>
  );
};

export default Footer;
