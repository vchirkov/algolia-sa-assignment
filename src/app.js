import Autocomplete from './components/autocomplete';

class SpencerAndWilliamsSearch {
  constructor() {
    this._initSearch();
    this._registerEvents();
  }

  _initSearch() {
    const applicationId = process.env.ALGOLIA_APP_ID;
    const apiKey = process.env.ALGOLIA_API_KEY;
    const indexName = process.env.ALGOLIA_INDEX_NAME;

    this.autocompleteDropdown = new Autocomplete(applicationId, apiKey, indexName);
  }

  _registerEvents() {
    const autocomplete = document.querySelector('.autocomplete');
    const searchbox = document.querySelector('#searchbox input');

    searchbox.addEventListener('click', () => {
      autocomplete.style.display = 'block';
    });

    searchbox.addEventListener('blur', () => {
      autocomplete.style.display = 'none';
    });
  }
}

const app = new SpencerAndWilliamsSearch();
