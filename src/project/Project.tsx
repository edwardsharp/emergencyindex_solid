import { Accessor, Show } from 'solid-js';
import IProject from './project.d';
import Meta from './Meta';
import Description from './Description';
import Tags from './Tags';

import './Project.css';
interface Props {
  project: Accessor<IProject | null | undefined>;
}

function Project(props: Props) {
  return (
    <Show when={props.project()}>
      {(p) => (
        <>
          <article class="Project">
            <div class="flex">
              <header>
                <Meta project={p} />
              </header>
              <section>
                <Description project={p} />
              </section>
            </div>
            <footer>
              <Tags project={p} />
            </footer>
          </article>
        </>
      )}
    </Show>
  );
}

export default Project;
