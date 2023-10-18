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
        setProject(pz[0]);
        return;
      }
      const allPz = allProjects();
      if (allPz?.length) {
        setProject(allPz[0]);
        return;
      }
    }
  });
  const [project, setProject] = createSignal<IProject | null>();
  const [currentProjectIdx, setCurrentProjectIdx] = createSignal(0);
  const [query, setQuery] = createSignal<string | undefined>(undefined);
  const [searchInputFocused, setSearchInputFocused] = createSignal(false);

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
    setProjects(allProjects());
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
