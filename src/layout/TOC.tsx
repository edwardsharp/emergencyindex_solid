import {
  Accessor,
  createMemo,
  createSignal,
  For,
  Setter,
  Show,
} from 'solid-js';
import clickOutside from './click-outside';
clickOutside;
import './TOC.css';
import IProject from '../project/project.d';
import { volume2VOL } from '../utilz/utilz';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: () => any;
    }
  }
}

interface Props {
  projects: Accessor<IProject[] | undefined>;
  project: Accessor<IProject | undefined>;
  setProject: Setter<IProject | undefined>;
}

function TOC(props: Props) {
  const { projects, setProject } = props;

  const currentIdx = createMemo(() => {
    const project = props.project();
    if (!project) return;
    return projects()?.indexOf(project);
  });

  const [show, setShow] = createSignal(false);

  return (
    <Show
      when={show()}
      fallback={
        <div class="TOC nav-hover" onClick={(e) => setShow(true)}>
          p. {props.project()?.pages}
        </div>
      }
    >
      <div class="TOCListWrapper">
        <For each={projects()} fallback={<div>Loading...</div>}>
          {(project, idx) => (
            <div
              class="TOCRow"
              use:clickOutside={() => setShow(false)}
              style={{
                'border-left': `${
                  currentIdx() === idx() ? '5px solid black' : 'none'
                }`,
              }}
              onClick={() => setProject(project)}
              title={`${project.title} -- ${project.contributor}`}
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
