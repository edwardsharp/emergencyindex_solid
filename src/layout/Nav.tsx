import { Accessor, Setter } from 'solid-js';
import IProject from '../project/project.d';
import './Nav.css';
import Query from './Query';
import TOC from './TOC';

interface Props {
  projects: Accessor<IProject[] | undefined>;
  project: Accessor<IProject | undefined>;
  setProject: Setter<IProject | undefined>;
}
function Nav(props: Props) {
  const { projects, project, setProject } = props;
  return (
    <div class="nav">
      <div>
        <div class="nav-hover" tabIndex={0}>
          <em class="emINDEX">
            <span>emergency</span>
            INDEX
          </em>
        </div>
      </div>
      <div></div>
      <div>
        <div class="query">
          <Query project={project} />
        </div>
        <div class="page">
          <TOC projects={projects} project={project} setProject={setProject} />
        </div>
      </div>
    </div>
  );
}

export default Nav;
