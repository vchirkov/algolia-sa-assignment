import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { hits, pagination, refinementList } from 'instantsearch.js/es/widgets';

class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  _registerClient() {
    this._searchClient = algoliasearch(
      'latency',
      '6be0576ff61c053d5f9a3225e2a90f76'
    );

    this._search = instantsearch({
      indexName: 'instant_search',
      searchClient: this._searchClient,
    });
  }

  _registerWidgets() {
    this._search.addWidgets([
      hits({
        container: '#hits',
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),
    ]);
  }

  _startSearch() {
    this._search.start();
  }
}

export default ResultPage;
