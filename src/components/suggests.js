import instantsearch from 'instantsearch.js';

// Instant Search Widgets
import { configure } from 'instantsearch.js/es/widgets';
import { suggestsWidget } from '../widgets/suggests-widget';

/**
 * @class Suggests
 * @description Instant Suggests class to show suggested queries for the search
 */
class Suggests {
  /**
   * @param {Object} searchClient - Algolia search client
   * @param {String} indexName - Algolia index name
   * @param {Object} opts - options for the suggestion widget
   *
   * @constructor
   */
  constructor(searchClient, indexName, opts = {}) {
    this._registerClient(searchClient, indexName);
    this._registerWidgets(opts);
    this._startSearch();
  }

  /**
   * @private
   * Handles creating of an instance of instant search
   * @param {Object} searchClient - Algolia search client
   * @param {String} indexName - Algolia index name
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
   * @param {Object} opts - options for the suggestion widget
   * @return {void}
   */
  _registerWidgets(opts) {
    const {
      onChange = () => null,
      onFocus = () => null,
      onBlur = () => null,
    } = opts;

    this._searchInstance.addWidgets([
      configure({
        hitsPerPage: 3,
      }),
      suggestsWidget({
        container: '#searchbox',
        placeholder: 'Search for products',
        onChange,
        onFocus,
        onBlur,
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

export default Suggests;
