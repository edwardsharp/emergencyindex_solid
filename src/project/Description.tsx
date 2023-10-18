import { Show } from 'solid-js';
import { useProject } from '../providers/projectContext';
import './Description.css';

function Description() {
  const { project } = useProject();

  return (
    <Show when={project()}>
      {(project) => (
        <div class="Description">
          <h5 class="title">
            <strong>{project().title}</strong>
          </h5>
          <h6 class="contributor">{project().contributor}</h6>

          <div class="content" innerHTML={project().content}></div>
        </div>
      )}
    </Show>
  );
}

export default Description;
