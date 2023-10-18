import { createEffect, createSignal, For, Show } from 'solid-js';
import clickOutside from './click-outside';
clickOutside;
import './TOC.css';
import { volume2VOL } from '../utilz/utilz';
import { useProject } from '../providers/projectContext';

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
      document.querySelector(`[data-idx='${idx}']`)?.scrollIntoView();
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
      <div class="TOCListWrapper">
        <For each={projects()} fallback={<div>no projects!</div>}>
          {(project, idx) => (
            <div
              class="TOCRow"
              use:clickOutside={() => setShow(false)}
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
