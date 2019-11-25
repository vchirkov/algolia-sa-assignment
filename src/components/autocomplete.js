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
    this._searchClient = algoliasearch('', '');

    this._search = instantsearch({
      indexName: '',
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
