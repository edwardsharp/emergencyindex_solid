import { Show } from 'solid-js';
import './Tags.css';
import { useProject } from '../providers/projectContext';

function Tags() {
  const { project, search } = useProject();

  return (
    <Show when={project()}>
      {(project) => (
        <div class="Tags">
          {/* <div>
        <a
          data-tooltip="Edit This Project on GitHub"
          data-position="top"
          href={`https://github.com/emergencyindex/projects-${project.volume}/blob/projects/${project.pages}.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="material-icons">edit</i>
        </a>
        <a
          data-tooltip="Cite this project"
          data-position="top"
          href={project.url ? project.url : '#'}
        >
          <i class="material-icons">cite</i>
        </a>
        <a
          data-tooltip="Permanent link to this project"
          data-position="top"
          href={project.url ? project.url : '#'}
        >
          <i class="material-icons">link</i>
        </a>
      </div> */}

          {project().tags && (
            <ul>
              {project().tags?.map((tag) => (
                <li>
                  <a
                    class="hotlink chip"
                    href="#"
                    data-tag={tag}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      search(tag, ['tags']);
                    }}
                    title={`search all projects tagged with: ${tag}`}
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Show>
  );
}

export default Tags;
