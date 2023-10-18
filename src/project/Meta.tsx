import { Accessor, Show, createEffect, createSignal } from 'solid-js';
import './Meta.css';
import IProject from './project.d';

function Meta(props: { project: Accessor<IProject> }) {
  const { project } = props;
  function setQuery(q: string | undefined) {
    console.log('#TODO: setQuery()', q);
  }

  return (
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
            setQuery(project().place);
          }}
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
          setQuery(project().contributor);
        }}
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
                setQuery(collaborator);
              }}
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
          setQuery(project().home);
        }}
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
  );
}

export default Meta;
