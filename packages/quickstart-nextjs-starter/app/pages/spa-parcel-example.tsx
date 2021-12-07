import React from 'react';
import { NextPage } from 'next';
import { mountRootParcel } from 'single-spa';
import Parcel from 'single-spa-react/parcel';

import { MyParcel } from 'components/parcels/entando-mf-recipes-sspa-parcel-recipe';
import { Layout } from 'components/Layout';

interface Props {
  importMaps?: string[];
}

const SpaParcelExamplePage: NextPage<Props> = () => {
  return (
    <Layout>
      <Parcel config={MyParcel} wrapWith="div" mountParcel={mountRootParcel} name="Filipe" />
      <Parcel config={MyParcel} wrapWith="div" mountParcel={mountRootParcel} name="Germano" />
    </Layout>
  );
};

export default SpaParcelExamplePage;
