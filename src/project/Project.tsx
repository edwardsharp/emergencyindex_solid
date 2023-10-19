import Meta from './Meta';
import Description from './Description';
import Tags from './Tags';

import './Project.css';
import { useProject } from '../providers/projectContext';

function Project() {
  const { showTOC } = useProject();
  return (
    <article class="Project">
      <div class="flex">
        <header>
          <Meta />
        </header>
        <section class={showTOC() ? 'TOC-margin' : ''}>
          <Description />
        </section>
      </div>
      <footer class={showTOC() ? 'TOC-margin' : ''}>
        <Tags />
      </footer>
    </article>
  );
}

export default Project;
