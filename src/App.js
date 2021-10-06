import React from 'react';

import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, Paging } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';

import Header from './components/Header';
import { Products, Product } from './components/Products';
import { Filtering, Showing, Searching } from './components/Searching';
import Footer from './components/Footer';
import { ModalProvider } from './components/Modal';

import './styles/style.scss';

const connector = new AppSearchAPIConnector({
  searchKey: 'search-gbqhz98zc8apb3iqhpx2fcz9',
  engineName: "product-db",
  //hostIdentifier: '',
  endpointBase: "https://ea2b9e38cdb6410b8ac920c8bbe2831c.ent-search.eu-central-1.aws.cloud.es.io",

});

const configurationOptions = {
  apiConnector: connector,
  autocompleteQuery: {
    suggestions: {
      types: {
        documents: {
          fields: ['produkt', 'ingredienser'], // Which fields to search for suggestions.
        },
      },
      size: 5, // How many suggestions appear.
    },
  },

  //TODO remove
  searchQuery: {
    search_fields: {
      produkt: {},
      ingredienser: {},
      kemikalier: {},
      leverantor: {}
    },
    result_fields: {
      produkt: { raw: {} },
      kemikalier: { raw: {} },
      kategori: { raw: {} },
      leverantor: { raw: {} },
      ingredienser: { raw: {} },
      ingredienser_list: { raw: {} },
      id: { raw: {} },
    },
    // 3. Facet by scores, genre, publisher, and platform (used by Filters)
    facets: {
      kemikalier: { type: 'value', size: 5 },
      leverantor: { type: 'value', size: 100 },
      kategori: { type: 'value', size: 25 },
    },
    disjunctiveFacets: ['kemikalier', 'leverantor', 'kategori'],
  },
  initialState: {
    resultsPerPage: 25,
    filters: [
      {
        field: 'kategori',
        values: ['bröd'],
        type: 'any',
      },
    ],
  },
};

const App = () => (
  <SearchProvider config={configurationOptions}>
    <ModalProvider>
      <Header />
      <Layout
        bodyContent={<Results view={Products} renderResult={Product} />}
        sideContent={<Filtering/>}
        bodyHeader={<Searching />}
        bodyFooter={<Paging />}
      />
      <Footer />
    </ModalProvider>
  </SearchProvider>
);

export default App;
