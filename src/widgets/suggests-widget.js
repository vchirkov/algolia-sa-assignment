import $ from 'jquery';
import 'selectize/dist/js/standalone/selectize';
import 'selectize/dist/css/selectize.css';

import { connectAutocomplete } from 'instantsearch.js/es/connectors';

/**
 * used to serve suggested queries for the search
 * @type {Widget}
 */
export const suggestsWidget = connectAutocomplete(
  ({ indices, refine, widgetParams }, isFirstRendering) => {
    const { container, onChange, onFocus, onBlur, placeholder } = widgetParams;
    const $container = $(container);

    if (isFirstRendering) {
      $container.html('<select id="autocomplete-select"></select>');

      $container.find('select').selectize({
        options: [],
        valueField: 'query',
        labelField: 'query',
        highlight: false,
        placeholder,
        onType(value) {
          refine(value);
          onChange(value);
        },
        onChange(value) {
          refine(value);
          onChange(value);
        },
        onBlur(...args) {
          onBlur(...args);
          this.setTextboxValue(this.currentResults.query);
        },
        onFocus,
        score() {
          return () => 1;
        },
        render: {
          option({ query }) {
            return `
              <div class='option'>
                ${query}
              </div>
            `;
          },
        },
      });

      return;
    }

    const [select] = $container.find('select');

    select.selectize.clearOptions();
    indices.forEach(({ results }) => {
      results.hits.forEach(hit => {
        select.selectize.addOption(hit);
      });
    });
    select.selectize.refreshOptions(select.selectize.isOpen);
  }
);
