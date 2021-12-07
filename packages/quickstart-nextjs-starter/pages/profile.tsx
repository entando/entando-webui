import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React from 'react';

interface User {
  name?: string;
  email?: string;
  image?: string;
  preferred_username?: string;
}

const ProfilePage: NextPage = () => {
  const { data: session } = useSession();

  const welcomeMessage = session?.user
    ? `Welcome back ${session.user.email ?? ''}!`
    : 'Welcome visitor. Please login to continue.';

  const user: User = session?.user;

  const profile = session?.user ? (
    <>
      <p>
        You are: <span className="text-success">logged in</span>
      </p>
      <p>{welcomeMessage}</p>
      <ul>
        <li>
          <span className="font-weight-bold mr-1">Email:</span>
          <span className="text-muted">{user.email ?? ''}</span>
        </li>
        <li>
          <span className="font-weight-bold mr-1">Username:</span>
          <span className="text-muted">{user.preferred_username ?? ''}</span>
        </li>
        <li>
          <span className="font-weight-bold mr-1">Name:</span>
          <span className="text-muted">{user.name ?? ''}</span>
        </li>
      </ul>
    </>
  ) : (
    <span className="text-danger">NOT logged in</span>
  );

  return (
    <Layout title="Profile | Next.js + Keycloak Example">
      <h1 className="my-5">User Profile</h1>
      {profile}
    </Layout>
  );
};

export default ProfilePage;
