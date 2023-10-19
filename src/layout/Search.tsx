import './Search.css';
import { useProject } from '../providers/projectContext';

import debounce from 'lodash.debounce';

export function Search() {
  const {
    projects,
    query,
    setQuery,
    clearQuery,
    setSearchInputFocused,
    search,
    searchKeyLabel,
    iconForSearchKeyLabel,
  } = useProject();

  const debouncedSearch = debounce((q: string) => search(q), 500);

  return (
    <div class="Search">
      <input
        id="search-input"
        value={query() || ''}
        oninput={(event) => {
          // ah hmm, debounce this?
          setQuery(event.currentTarget.value);
          console.log('zomg debounce search!');
          debouncedSearch(event.currentTarget.value);
        }}
        onKeyDown={(event) => event.key === 'Enter' && search(query())}
        onFocus={() => {
          setSearchInputFocused(true);
        }}
        onBlur={() => {
          window.setTimeout(() => {
            setSearchInputFocused(false);
          }, 250);
        }}
        placeholder="Search Emergency INDEX"
      />

      <div class="results-count">
        <span>
          {projects()?.length}{' '}
          {projects()?.length === 1 ? 'project' : 'projects'}{' '}
          {searchKeyLabel() !== 'global' && (
            <span title={searchKeyLabel()}>({iconForSearchKeyLabel()})</span>
          )}
        </span>

        <button
          title="clear search"
          onClick={() => {
            clearQuery();
          }}
        >
          clear
        </button>
      </div>
    </div>
  );
}

export default Search;
