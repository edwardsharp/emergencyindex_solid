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
  const [projects] = createResource<IProject[]>(fetchProjects);

  createEffect(() => {
    const pz = projects();
    if (!project() && pz?.length) {
      console.log(
        '[projectContext] ZOMG NO PROJECT! so gonna init one. p[0]?',
        pz[0]
      );
      setProject(pz[0]);
    }
  });
  const [project, setProject] = createSignal<IProject | null>();
  const [currentProjectIdx, setCurrentProjectIdx] = createSignal(0);

  const prevProject = () => {
    setCurrentProjectIdx((prev) => Math.max(0, prev - 1));
    setProject(projects()?.find((_, idx) => idx === currentProjectIdx()));
  };

  const nextProject = () => {
    setCurrentProjectIdx((prev) => Math.min(projects()?.length || 0, prev + 1));
    setProject(projects()?.find((_, idx) => idx === currentProjectIdx()));
  };

  return { projects, project, setProject, prevProject, nextProject };
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
