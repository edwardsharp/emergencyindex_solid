import Meta from './Meta';
import Description from './Description';
import Tags from './Tags';

import './Project.css';

function Project() {
  return (
    <article class="Project">
      <div class="flex">
        <header>
          <Meta />
        </header>
        <section>
          <Description />
        </section>
      </div>
      <footer>
        <Tags />
      </footer>
    </article>
  );
}

export default Project;
