import IProject from './project.d';
import './Description.css';
import { Accessor } from 'solid-js';
interface Props {
  project: Accessor<IProject>;
}

function Description(props: Props) {
  const { project } = props;

  return (
    <div class="Description">
      <h5 class="title">
        <strong>{project().title}</strong>
      </h5>

      <h6 class="contributor">{project().contributor}</h6>

      <div class="content" innerHTML={project().content}></div>
    </div>
  );
}

export default Description;
