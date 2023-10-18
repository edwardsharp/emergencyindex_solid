import { Show, createSignal, onMount } from "solid-js";
import "./App.css";
import IProject from "./project/project.d";
import Project from "./project/Project";

function App() {
  // const [projects, setProjects] = createSignal<IProject[]>([]);
  const [project, setProject] = createSignal<IProject | null>(null);

  onMount(() => {
    const localStoreProjects = JSON.parse(
      localStorage.getItem("projects") || "null"
    );

    if (!localStoreProjects) {
      console.log("fetching projects from /data.json");
      fetch("/data.json")
        .then((response) => response.json())
        .then((data) => {
          try {
            localStorage.setItem("projects", JSON.stringify(data));
          } catch (e) {
            console.warn("caught error in localStorage.setItem e:", e);
          }
          console.log("will setProjects", data[0]);
          // setProjects(data);
          setProject(data[0]);
        })
        .catch((e) => {
          console.warn("onoz caught error loading data e:", e);
        });
    } else {
      // setProjects(localStoreProjects);
    }
  });

  return (
    <Show when={project()} fallback={<div>Loading...</div>}>
      {(p) => <Project project={p()} />}
    </Show>
  );
}

export default App;
