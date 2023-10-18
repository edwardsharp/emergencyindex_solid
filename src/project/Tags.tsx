import { Accessor } from 'solid-js';
import IProject from './project.d';
import './Tags.css';

interface Props {
  project: Accessor<IProject>;
}

function Tags(props: Props) {
  const { project } = props;
  // return <>{props.project.tags?.join(", ")}</>;
  function setQuery(q: string | undefined) {
    console.log('#TODO meta setQuery()', q);
  }
  return (
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
                  setQuery(tag);
                }}
              >
                {tag}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tags;
