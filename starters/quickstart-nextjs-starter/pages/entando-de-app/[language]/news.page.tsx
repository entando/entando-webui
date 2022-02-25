import React from 'react';
import { Layout } from 'components/Layout';

import { getLanguages, getPage, IPage } from '@entando-webui/app-engine-client';
import { listNews, INews }  from '@entando-webui/ootb-components';
import { NewsListItem } from 'components/NewsListItem';

interface Props {
  page: IPage
  news: Array<INews>
}

const NewsPage = ({ page, news }: Props) => {
  return (
    <Layout title={page.title}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {news.map(n => (
          <NewsListItem {...n} key={n.id}/>
        ))}
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const { language } = params;
  const pageCode = 'news';
  const pageData = await getPage(pageCode);
  const news = await listNews();

  return {
    props: {
      page: {
        seoMetadata: { },
        group: pageData.ownerGroup,
        secondaryGroups: pageData.joinGroups,
        title: pageData.fullTitles[language],
      },
      language,
      news,
    },
    revalidate: 15 * 60, //15 minutes
  };
}

export async function getStaticPaths() {
  const langs = await getLanguages();
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

export default NewsPage;
