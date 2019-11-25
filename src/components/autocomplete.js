import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { hits, searchBox, configure } from 'instantsearch.js/es/widgets';
import autocompleteProductTemplate from '../templates/autocomplete-product';

class Autocomplete {
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
      configure({
        hitsPerPage: 3,
      }),
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
    ]);
  }

  _startSearch() {
    this._search.start();
  }
}

export default Autocomplete;
