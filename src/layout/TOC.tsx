import { createEffect, createSignal, For, Show } from 'solid-js';
import clickOutside from './click-outside';
clickOutside;
import './TOC.css';
import { volume2VOL } from '../utilz/utilz';
import { useProject } from '../providers/projectContext';
import Search from './Search';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: () => any;
    }
  }
}

function TOC() {
  const {
    project,
    projects,
    setProject,
    currentProjectIdx,
    setCurrentProjectIdx,
  } = useProject();

  const [show, setShow] = createSignal(false);

  createEffect(() => {
    if (show()) {
      const idx = currentProjectIdx();
      console.log('zomg scroll into view!!');
      const elem = document.querySelector(`[data-idx='${idx}']`);
      if (elem) {
        elem.scrollIntoView({
          block: 'center',
        });
        console.log(
          'elem.scrollTop:',
          document.querySelector('.TOCListWrapper')?.scrollTop
        );
        // .scrollBy({
        //   top: 100,
        //   left: 100,
        //   behavior: "smooth",
        // });
        // document
        //   .querySelector('.TOCListWrapper')
        //   ?.scrollBy({ top: 64, behavior: 'smooth' });
      }
    }
  });

  return (
    <Show
      when={show()}
      fallback={
        <div class="TOC nav-hover" onClick={(e) => setShow(true)}>
          p. {project()?.pages}
        </div>
      }
    >
      <div class="TOCListWrapper" use:clickOutside={() => setShow(false)}>
        <Search />

        <div class="TOCRow TOCFirstRow"></div>
        <For each={projects()} fallback={<div>no projects!</div>}>
          {(project, idx) => (
            <div
              class="TOCRow"
              style={{
                'border-left': `${
                  currentProjectIdx() === idx() ? '5px solid black' : 'none'
                }`,
              }}
              onClick={() => {
                setProject(project);
                setCurrentProjectIdx(idx);
              }}
              title={`${project.title} -- ${project.contributor}`}
              data-idx={idx()}
            >
              <div class="volume-pages">
                <div>{volume2VOL(project.volume)}</div>
                <div>p.{project.pages}</div>
              </div>
              <div class="overflow">
                <div>{project.title}</div>
                <div>{project.contributor}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
}

export default TOC;
