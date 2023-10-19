// import { For } from 'solid-js';
import { useProject } from '../providers/projectContext';
import { volume2VOL } from '../utilz/utilz';
import './Nav.css';
import Query from './Query';
import TOC from './TOC';

function Nav() {
  const { project, prevProject, nextProject } = useProject();
  return (
    <>
      <div class="page-bottom-nav">
        <div
          class="nav-hover prev-project"
          onclick={() => prevProject()}
          title="previous project"
        >
          ➪
        </div>
        {/* <div class="browse">
          <For each={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}>
            {(volume) => <div class="volume nav-hover">VOL.{volume}</div>}
          </For>
        </div> */}
        <div
          class="nav-hover"
          onclick={() => nextProject()}
          title="next project"
        >
          ➪
        </div>
      </div>

      <div class="nav">
        <div class="title-container">
          {/* class="nav-hover"  */}
          <div tabIndex={0}>
            <em class="emINDEX">
              <span>emergency</span>
              INDEX
            </em>
          </div>
        </div>

        <div class="nav-right-container">
          <div class="query">
            <Query />
          </div>
          <div class="volume">{volume2VOL(project()?.volume)}</div>
          <div class="page">
            <TOC />
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
