import {
  createContext,
  createSignal,
  useContext,
  ParentComponent,
} from 'solid-js';
import IProject from '../project/project.d';

function useProviderValue() {
  const [project, setProject] = createSignal<IProject | null>();
  return { project, setProject };
}

export type ContextType = ReturnType<typeof useProviderValue>;

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

export function useIsProject() {
  return useProject().project;
}

// export function useSetProject() {
//   return useProject()?.setProject;
// }
