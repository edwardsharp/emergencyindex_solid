import {
  createContext,
  createSignal,
  useContext,
  ParentComponent,
  createResource,
  createEffect,
} from 'solid-js';
import IProject from '../project/project.d';

const fetchProjects = async () => (await fetch('/data.json')).json();

// search by project properties with this exactMatchOptions obj
const defaultProjectKeys = [
  'contributor',
  'title',
  'content',
  'place',
  'collaborators',
  'home',
  'tags',
  'volume',
  'first_performed',
] as const;
type ProjectKeys = (typeof defaultProjectKeys)[number];
const searchKeyLabels = ['global', ...defaultProjectKeys] as const;
type ProjectKeyLabels = (typeof searchKeyLabels)[number];
function mapIconToSearchKeyLabel(key: ProjectKeyLabels) {
  switch (key) {
    case 'global':
      return '🔎';
    case 'place':
      return `📍`;
    case 'contributor':
      return '🗣️';
    case 'title':
      return '🪪';
    case 'content':
      return '📜';
    case 'collaborators':
      return '🫂';
    case 'home':
      return '🏠';
    case 'tags':
      return '🏷️';
    case 'volume':
      return '📚';
    case 'first_performed':
      return '🗓️';
    default:
      return '🔎';
  }
}

function useProviderValue() {
  const [allProjects] = createResource<IProject[]>(fetchProjects);
  const [projects, setProjects] = createSignal<IProject[]>();

  createEffect(() => {
    if (!projects() && !allProjects.loading) {
      // initialize all projects!
      setProjects(allProjects());
    }
  });
  createEffect(() => {
    if (!project()) {
      const pz = projects();
      if (pz?.length) {
        // start with most recent project
        setProject(pz[(allProjects()?.length || 1) - 1]);
        setCurrentProjectIdx((allProjects()?.length || 1) - 1);
        return;
      }
      const allPz = allProjects();
      if (allPz?.length) {
        // start with most recent project
        setProject(allPz[(allProjects()?.length || 1) - 1]);
        setCurrentProjectIdx((allProjects()?.length || 1) - 1);
        return;
      }
    }
  });
  const [project, setProject] = createSignal<IProject | null>();
  const [currentProjectIdx, setCurrentProjectIdx] = createSignal(0);
  const [searchOnKeys, setSearchOnKeys] = createSignal<ProjectKeys[]>(
    defaultProjectKeys as unknown as ProjectKeys[]
  );
  const [searchKeyLabel, setSearchKeyLabel] =
    createSignal<ProjectKeyLabels>('global');
  const [query, setQuery] = createSignal<string | undefined>(undefined);
  const [searchInputFocused, setSearchInputFocused] = createSignal(false);

  //this signal could go somewhere else, i guess?
  const [showTOC, setShowTOC] = createSignal(false);

  const prevProject = () => {
    setCurrentProjectIdx((prev) => Math.max(0, prev - 1));
    setProject(projects()?.find((_, idx) => idx === currentProjectIdx()));
    window.scrollTo({ top: 1 });
  };

  const nextProject = () => {
    setCurrentProjectIdx((prev) =>
      Math.min((projects()?.length || 1) - 1, prev + 1)
    );
    setProject(projects()?.find((_, idx) => idx === currentProjectIdx()));
    window.scrollTo({ top: 1 });
  };

  function clearQuery() {
    console.log('gonna clear query!!!');
    setQuery(undefined);
    // oh typescript :/
    setSearchOnKeys(defaultProjectKeys as unknown as ProjectKeys[]);
    setSearchKeyLabel('global');
    setProjects(allProjects());
  }

  function exactMatchSearch(q: string) {
    // const propz: ProjectProps[] = Object.entries(exactMatchOptions).reduce<
    //   ProjectProps[]
    // >((acc, v) => {
    //   v[1] && acc.push(v[0] as ProjectProps);
    //   return acc;
    // }, []);
    console.log('ZOMG searchOnKeys:', searchOnKeys());
    if (searchOnKeys() && searchOnKeys().length === 0) {
      console.log('no propz :/');
      return;
    }
    const re = new RegExp(q.replace(/([^a-zA-Z0-9])/g, '\\$1'), 'i');
    return allProjects()?.reduce<IProject[]>((acc, v) => {
      for (const prop of searchOnKeys()) {
        // it really might not be a string, sorry tsc :/
        if (re.test(v[prop] as string)) {
          acc.push(v);
          break;
        }
      }
      return acc;
    }, []);
  }

  function search(q?: string, keys?: ProjectKeys[]) {
    console.log('[projectContext] SEARCH q:', q, ' keys:', keys);
    if (!q) return;
    if (!keys || !keys.length) {
      setSearchKeyLabel('global');
      setQuery(q);
      setProjects(exactMatchSearch(q) || []);
      setShowTOC(true);
      return;
    }
    setSearchKeyLabel(keys[0]); // hmm :/
    setSearchOnKeys(keys);
    setQuery(q);
    setProjects(exactMatchSearch(q) || []);
    setShowTOC(true);
  }

  function iconForSearchKeyLabel() {
    return mapIconToSearchKeyLabel(searchKeyLabel());
  }

  function isFirstProject() {
    return currentProjectIdx() <= 0;
  }
  function isLastProject() {
    return currentProjectIdx() >= (projects()?.length || 0) - 1;
  }
  return {
    projects,
    setProjects,
    currentProjectIdx,
    setCurrentProjectIdx,
    project,
    setProject,
    prevProject,
    nextProject,
    query,
    setQuery,
    allProjects,
    clearQuery,
    searchInputFocused,
    setSearchInputFocused,
    searchKeyLabel,
    searchOnKeys,
    search,
    showTOC,
    setShowTOC,
    iconForSearchKeyLabel,
    isFirstProject,
    isLastProject,
  };
}

type ContextType = ReturnType<typeof useProviderValue>;

const ProjectContext = createContext<ContextType | undefined>(undefined);

export const ProjectProvider: ParentComponent = (props) => {
  const value = useProviderValue();
  return (
    <ProjectContext.Provider value={value}>
      {props.children}
    </ProjectContext.Provider>
  );
};

// bit.ly/SafeContext
export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error(`useProject must be used within a ProjectProvider`);
  }
  return context;
}
