import instantsearch from 'instantsearch.js';

// Instant Search Widgets
import { hits, configure } from 'instantsearch.js/es/widgets';

// Autocomplete Template
import autocompleteProductTemplate from '../templates/autocomplete-product';

/**
 * @class Autocomplete
 * @description Instant Search class to display content in the page's autocomplete
 */
class Autocomplete {
  /**
   * @constructor
   *
   * @param {Object} searchClient - Algolia search client
   * @param {String} indexName - Algolia index name
   */
  constructor(searchClient, indexName) {
    this._registerClient(searchClient, indexName);
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @public
   * used to show the autocomplete products results
   * @return {void}
   */
  show() {
    const autocomplete = document.querySelector('.autocomplete');
    if (!autocomplete) return;
    autocomplete.style.display = 'block';
  }

  /**
   * @public
   * used to hide the autocomplete products results
   * @return {void}
   */
  hide() {
    const autocomplete = document.querySelector('.autocomplete');
    if (!autocomplete) return;
    autocomplete.style.display = 'none';
  }

  /**
   * @public
   * used to trigger product search
   * @param {String} query - the query to search for
   * @return {void}
   */
  search(query) {
    this._searchInstance.helper.setQuery(query);
    this._searchInstance.helper.search();
  }

  /**
   * @private
   * @param {Object} searchClient - Algolia search client
   * @param {String} indexName - Algolia index name
   *
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient(searchClient, indexName) {
    this._searchInstance = instantsearch({
      searchClient,
      indexName,
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      configure({
        hitsPerPage: 12,
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default Autocomplete;
