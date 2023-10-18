import { createSignal, onMount } from 'solid-js';
// import IProject from './project/project.d';
import Project from './project/Project';
import Nav from './layout/Nav';
import { ProjectProvider } from './providers/projectContext';
import IProject from './project/project.d';
// import Xwiper from './swipe';
// import { produce } from 'solid-js/store';

function App() {
  // const [projects, setProjects] = createSignal<IProject[]>();
  // const [project, setProject] = createSignal<IProject | null>();

  const [projects, setProjects] = createSignal<IProject[]>();
  // const { project, setProject } = useProject();
  const [project, setProject] = createSignal<IProject>();
  // const project = useProject()?.project;
  // const setProject = useProject()?.setProject;

  function setRandomProject() {
    const p = projects() || [];
    const randIdx = Math.floor(Math.random() * p.length);
    setProject(p[randIdx]);
  }

  onMount(() => {
    // let overscroll: boolean;
    // window.addEventListener('touchstart', function () {
    //   // User has very quick fingers.
    //   overscroll = false;
    // });
    // window.addEventListener('touchend', function () {
    //   // User released touch-drag event when element was in an overscroll state.
    //   if (document.body.scrollTop < 0) {
    //     overscroll = true;
    //   }
    // });

    window.visualViewport?.addEventListener('scroll', function (e) {
      console.log(e, 'ZOMG window.visualViewport:');
    });
    window.addEventListener('scroll', function (e) {
      console.log(
        e,
        'ZOMG scroll:',
        'window.scrollY:',
        window.scrollY,
        'document.scrollingElement?.scrollTop:',
        document.scrollingElement?.scrollTop
      );
      if (
        document.scrollingElement &&
        document.scrollingElement.scrollTop < 0
      ) {
        console.log('ZOMG OVERSCROLL TOP!!');
      }
    });

    let pageWidth = window.innerWidth || document.body.clientWidth;
    let treshold = Math.max(1, Math.floor(0.01 * pageWidth));
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const limit = Math.tan(((45 * 1.5) / 180) * Math.PI);
    // const gestureZone = document.getElementById('modalContent');

    document.addEventListener(
      'touchstart',
      function (event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
      },
      false
    );

    document.addEventListener(
      'touchend',
      function (event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesture(event);
      },
      false
    );

    function handleGesture(e: any) {
      let x = touchendX - touchstartX;
      let y = touchendY - touchstartY;
      let xy = Math.abs(x / y);
      let yx = Math.abs(y / x);
      if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (xy <= limit) {
          if (y < 0) {
            console.log('top');
            return;
          } else {
            console.log('bottom');
            return;
          }
        }
        if (yx <= limit) {
          if (x < 0) {
            console.log('left');
            setRandomProject();
          } else {
            console.log('right');
            setRandomProject();
          }
        }
      } else {
        console.log('tap');
      }
    }

    console.log('fetching projects from /data.json');
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        try {
          localStorage.setItem('projects', JSON.stringify(data));
        } catch (e) {
          console.warn('caught error in localStorage.setItem e:', e);
        }
        console.log('will setProjects', data.length);
        setProjects(data);
        setProject(data[0]);
        // setRandomProject();
      });
  });

  return (
    <ProjectProvider>
      <>
        {/* {project()?.title} */}

        <Project project={project} />
        <Nav projects={projects} project={project} setProject={setProject} />
        {/* <Show when={project && project()} fallback={<div>Loading...</div>}>
          
        </Show> */}
        {/* <Show when={projects()} fallback={<div>Loading...</div>}>
          {(p) => <Nav projects={p()} />}
        </Show> */}
      </>
    </ProjectProvider>
  );
}

export default App;
