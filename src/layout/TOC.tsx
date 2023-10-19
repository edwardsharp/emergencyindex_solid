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
    showTOC,
    setShowTOC,
  } = useProject();

  createEffect(() => {
    if (showTOC()) {
      const idx = currentProjectIdx();
      const elem = document.querySelector(`[data-idx='${idx}']`);
      if (elem) {
        elem.scrollIntoView({
          block: 'center',
        });
      }
    }
  });

  return (
    <Show
      when={showTOC()}
      fallback={
        <div
          class="TOC nav-hover"
          onClick={() => setShowTOC(true)}
          tabIndex={0}
        >
          p. {project()?.pages}
        </div>
      }
    >
      <div class="TOCListWrapper" use:clickOutside={() => setShowTOC(false)}>
        <Search />

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
                setShowTOC(false);
              }}
              title={`${project.title} -- ${project.contributor}`}
              data-idx={idx()}
              tabIndex={0}
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
