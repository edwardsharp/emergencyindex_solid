import { For, ParentComponent, createSignal } from 'solid-js';
import { Show } from 'solid-js';
import { useProject } from '../providers/projectContext';
import { volume2VOL } from '../utilz/utilz';
import './Nav.css';
import Query from './Query';
import TOC from './TOC';
import clickOutside from './click-outside';
clickOutside;

export const Volumes: ParentComponent = (props) => {
  const [showVolumes, setShowVolumes] = createSignal(false);
  const { search } = useProject();
  return (
    <Show
      when={showVolumes()}
      fallback={
        <div
          class="volume nav-hover"
          title="show all volumes"
          tabIndex={0}
          onclick={() => setShowVolumes((s) => !s)}
        >
          {props.children}
        </div>
      }
    >
      <div
        class="TOCListWrapper"
        use:clickOutside={() => setShowVolumes(false)}
      >
        <For
          each={[
            [1, 2011],
            [2, 2012],
            [3, 2013],
            [4, 2014],
            [5, 2015],
            [6, 2016],
            [7, 2017],
            [8, 2018],
            [9, 2019],
            [10, 2020],
          ]}
        >
          {(volume) => (
            <div
              class="volume-item nav-hover"
              onclick={() => search(volume[1].toString(), ['volume'])}
            >
              <span>VOL.{volume[0]} </span>
              <span>({volume[1]})</span>
            </div>
          )}
        </For>
      </div>
    </Show>
  );
};

function Nav() {
  const {
    project,
    prevProject,
    nextProject,
    showTOC,
    setShowTOC,
    isFirstProject,
    isLastProject,
  } = useProject();
  return (
    <>
      <div class="nav">
        <div class="title-container">
          <div
            class="nav-hover"
            onclick={() => (window.location.href = '/')}
            tabIndex={0}
            title="start over!"
          >
            <em class="emINDEX">
              <span>emergency</span>
              INDEX
            </em>
          </div>
        </div>
        <Show when={!showTOC()}>
          <div class="nav-right-container">
            <Show when={!isFirstProject()}>
              <div
                class="nav-hover prev-project"
                onclick={() => prevProject()}
                title="previous project"
                tabIndex={0}
              >
                ➪
              </div>
            </Show>
            <div
              class="query nav-hover"
              onClick={() => {
                setShowTOC(true);

                window.setTimeout(
                  () =>
                    (
                      document.querySelector('#search-input') as HTMLElement
                    )?.focus(),
                  100
                );
              }}
              title="open table of contents"
              tabIndex={0}
            >
              <Query />
            </div>
            <Volumes>{volume2VOL(project()?.volume)}</Volumes>

            <div
              class="page nav-hover"
              onClick={() => setShowTOC(true)}
              title="open table of contents"
              tabIndex={0}
            >
              <div class="TOC">p. {project()?.pages}</div>
            </div>

            <Show when={!isLastProject()}>
              <div
                class="nav-hover next-project"
                onclick={() => nextProject()}
                title="next project"
                tabIndex={0}
              >
                ➪
              </div>
            </Show>
          </div>
        </Show>
      </div>

      <TOC />
    </>
  );
}

export default Nav;
