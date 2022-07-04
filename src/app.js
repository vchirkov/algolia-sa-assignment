import Autocomplete from './components/autocomplete';
import Suggests from './components/suggests';
import algoliasearch from 'algoliasearch';

const applicationId = process.env.ALGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;
const resultsIndexName = process.env.ALGOLIA_RESULTS_INDEX_NAME;
const suggestsIndexName = process.env.ALGOLIA_SUGGESTS_INDEX_NAME;

class SpencerAndWilliamsSearch {
  constructor() {
    this._searchClient = algoliasearch(applicationId, apiKey);
    this.autocomplete = new Autocomplete(this._searchClient, resultsIndexName);
    this.suggests = new Suggests(this._searchClient, suggestsIndexName, {
      onChange: query => this.autocomplete.search(query),
      onFocus: () => this.autocomplete.show(),
    });
    this._registerEvents();
  }

  _registerEvents() {
    // hide autocomplete, when clicked outside of searchbox
    const searchbox = document.querySelector('.header__searchbox-container');
    document.body.addEventListener('click', e => {
      if (searchbox.contains(e.target)) return;
      this.autocomplete.hide();
    });
  }
}

// eslint-disable-next-line no-unused-vars
const app = new SpencerAndWilliamsSearch();
