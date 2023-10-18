import Meta from "./Meta";
import Description from "./Description";
import Tags from "./Tags";

import IProject from "./project.d";

interface Props {
  project: IProject;
}

function Project(props: Props) {
  const { project } = props;
  // if (!project) return null;
  return (
    <article class="Project">
      <div class="flex">
        <header>
          <Meta project={project} />
        </header>
        <section>
          <Description project={project} />
        </section>
      </div>
      <footer>
        <Tags project={project} />
      </footer>
    </article>
  );
}

export default Project;
