import React from 'react';
import { Layout } from 'components/Layout';

import { useEntandoPermissions } from 'hooks/useEntandoPermissions';
import { useSession } from 'next-auth/react';
import { Entando6CoreLanguagesDataSource, Entando6CorePageDataSource } from '../../../datasources/entando6-core';

/**
 * Example Route Override.
 * 
 * This example shows how to override a route that is usually
 * provided by PortalUI: /entando-de-app/en/service.page
 * 
 * This specific page is now controlled by WebUI and you can apply
 * any web development techinique you want.
 * 
 * Routes that are not overriden by specific next.js routes,
 * are fallbacked to the [...catchall].js route
 *
 **/

interface IPage {
  title: string
  group: string
  secondaryGroups: Array<string>
}

 interface Props {
  page: IPage
}

const ServicePage = ({ page }: Props) => {
  const { data: session } = useSession();
  const hasPermission = useEntandoPermissions(page.group, page.secondaryGroups, session);
  
  return (
    <Layout title={page.title}>
      {hasPermission ? (
        <>
          <h1 className="my-5">Welcome to the Next Generation Entando Web Renderization Engine 👋</h1>
          <div className="mb-5 lead text-muted">
            This page route was overriden from PortalUI,
            so that you can gradually migrate your Legacy pages into WebUI.
          </div>
        </>
      ) : (
        <h1>403: Not Authorized</h1>
      )}
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const { language } = params;
  const pageCode = 'service';
  const pageData = await Entando6CorePageDataSource(pageCode);

  return {
    props: {
      page: {
        seoMetadata: { },
        group: pageData.ownerGroup,
        secondaryGroups: pageData.joinGroups,
        title: pageData.fullTitles[language],
      },
      language,
    },
    revalidate: 15 * 60, //15 minutes
  };
}

export async function getStaticPaths() {
  const langs = await Entando6CoreLanguagesDataSource();
  const paths = langs
    .filter(lang => lang.isActive === true)
    .map(lang => {
      return { params: { language: lang.code }};
    });

  return {
    paths,
    fallback: false,
  };
}

export default ServicePage;
