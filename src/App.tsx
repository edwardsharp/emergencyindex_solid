import { ProjectProvider } from './providers/projectContext';
import Volume from './layout/Volume';

function App() {
  // const [projects, setProjects] = createSignal<IProject[]>();
  // const [project, setProject] = createSignal<IProject>();

  // const [data] = createResource<IProject[]>(fetchProjects)
  // data()
  // function setRandomProject() {
  //   const p = projects() || [];
  //   const randIdx = Math.floor(Math.random() * p.length);
  //   setProject(p[randIdx]);
  // }

  return (
    <ProjectProvider>
      <Volume />
    </ProjectProvider>
  );
}

export default App;
