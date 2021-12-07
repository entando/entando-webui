import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

import { Entando6UserAuthoritiesDataSource, refreshClientToken } from '@entando-webui/app-engine-client';

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}`,
    })
  ],
  debug: process.env.WEBUI_DEBUG === true,
  secret: process.env.APP_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = { ...session.user, ...token.user };
        session.entandoCoreAccessToken = token.accessToken;
        session.entandoCoreRefreshToken = token.refreshToken;
        session.entandoCoreSessionExpires = token.expires;
      }

      return session;
    },
    async jwt({ token, user, account, profile }) {
      const username = profile ? profile.preferred_username : token.user.username;
      
      // Initial sign in
      if (user && profile) {
        console.log('NextAuth: Injecting Entando Core Permissions into JWT Session: ', username);
        const permissions = await Entando6UserAuthoritiesDataSource(username);

        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expires: new Date(account.expires_at * 1000),
          user: { ...user, username, permissions },
        };
      }

      // Return previous token if the access token has not expired yet
      if (new Date() < new Date(token.expires)) {
        return token;
      }

      // Access token has expired, try to update it
      const refreshedToken =  await refreshClientToken(token.refreshToken);
      const permissions = await Entando6UserAuthoritiesDataSource(username);

      return {
        accessToken: refreshedToken.access_token,
        refreshToken: refreshedToken.refresh_token,
        expires: new Date(new Date().getTime() + refreshedToken.expires_in * 1000),
        user: { ...token.user, username, permissions },
      };
    },
  },
  session: {
    // More information at: https://next-auth.js.org/configuration/options#session
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
