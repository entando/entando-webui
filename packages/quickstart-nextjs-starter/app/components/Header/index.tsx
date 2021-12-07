import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <a>
          <Image src="/entando.svg" alt="Entando Logo" className={styles.img} width="160" height="40"/>
        </a>
      </Link>
      <>
        <Link href="/profile">
          <a className="p-2 text-dark">Profile</a>
        </Link>
      </>
      {isAuthenticated ? (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-danger"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-success"
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Login
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
