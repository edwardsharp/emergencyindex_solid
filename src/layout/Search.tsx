import './Search.css';
import { useProject } from '../providers/projectContext';

import debounce from 'lodash.debounce';
import IProject from '../project/project.d';

type ProjectProps =
  | 'contributor'
  | 'title'
  | 'content'
  | 'place'
  | 'collaborators'
  | 'home'
  | 'tags'
  | 'volume';

const exactMatchOptions: { [key in ProjectProps]: boolean } = {
  contributor: true,
  title: true,
  content: true,
  place: true,
  collaborators: true,
  home: true,
  tags: true,
  volume: true,
};

export function Search() {
  const {
    allProjects,
    projects,
    setProjects,
    query,
    setQuery,
    clearQuery,
    setSearchInputFocused,
  } = useProject();

  const debouncedSearch = debounce((q: string) => search(q), 500);

  function search(q: string | undefined) {
    console.log('[Search] serch(q):', q);
    if (q === undefined) {
      return;
    }
    const results = exactMatchSearch(q);
    console.log('search() results.length:', results?.length);
    setProjects(results || []);
  }

  function exactMatchSearch(q: string) {
    const propz: ProjectProps[] = Object.entries(exactMatchOptions).reduce<
      ProjectProps[]
    >((acc, v) => {
      v[1] && acc.push(v[0] as ProjectProps);
      return acc;
    }, []);
    if (propz && propz.length === 0) {
      console.log('no propz :/');
      return;
    }
    const re = new RegExp(q.replace(/([^a-zA-Z0-9])/g, '\\$1'), 'i');
    return allProjects()?.reduce<IProject[]>((acc, v) => {
      for (const prop of propz) {
        // it really might not be a string, sorry tsc :/
        if (re.test(v[prop] as string)) {
          acc.push(v);
          break;
        }
      }
      return acc;
    }, []);
  }

  return (
    <div class="Search">
      <input
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
          {projects()?.length === 1 ? 'project' : 'projects'}
        </span>
        {!!query() && (
          <button
            title="clear search"
            onClick={() => {
              clearQuery();
            }}
          >
            clear
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;
