import { Show } from 'solid-js';
import './Meta.css';
import { useProject } from '../providers/projectContext';

function Meta() {
  const { project, search } = useProject();

  return (
    <Show when={project()}>
      {(project) => (
        <div class="Meta">
          {/* `/assets/img/${project().volume}/${project().image}` */}
          <img
            src={`https://index.alveol.us/assets/img/${project().volume}/${
              project().image
            }`}
            class="project-img"
            data-caption={`photo: ${project().photo_credit?.replace(
              'Photo credit: ',
              ''
            )}`}
            alt="project"
          />
          <div class="photo-credit truncate">{`${project().photo_credit?.replace(
            'Photo credit: ',
            ''
          )}`}</div>

          <h5 class="title">
            <strong>{project().title}</strong>
          </h5>

          <p>
            <span class="first_performed">
              {project().volume?.toString() === '2011' && 'first performed on '}
              {project().first_performed}
            </span>

            <span
              class="place hotlink"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                search(project().place, ['place']);
              }}
              title={`search all projects for place: ${project().place}`}
              tabIndex={0}
            >
              {project().place}
            </span>

            <br />
            {project().times_performed}
          </p>

          <h6
            class="contributor hotlink"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              search(project().contributor, ['contributor']);
            }}
            title={`search all projects for contributor: ${
              project().contributor
            }`}
            tabIndex={0}
          >
            {project().contributor}
          </h6>

          <p class="project-collaborators">
            {project().collaborators?.map((collaborator, i) => (
              <span>
                <span
                  class="hotlink"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    search(collaborator, ['collaborators']);
                  }}
                  title={`search all projects for collaborators: ${collaborator}`}
                  tabIndex={0}
                >
                  {collaborator}
                </span>
                {i < (project().collaborators?.length || 0) - 1 && ', '}
              </span>
            ))}
          </p>

          <p
            class="home hotlink"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              search(project().home, ['home']);
            }}
            title={`search all projects for home: ${project().home}`}
            tabIndex={0}
          >
            {project().home}
          </p>

          <div>
            <div class="contact">{project().contact}</div>
            {project().links && (
              <div class="links">
                {project().links?.map((link) => {
                  const l =
                    link.match('http://') || link.match('https://')
                      ? link
                      : `http://${link}`;
                  return (
                    <span>
                      <a
                        href={l}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link"
                      >
                        {l}
                      </a>
                      <br />
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {project().footnote}
        </div>
      )}
    </Show>
  );
}

export default Meta;
