import { useProject } from '../providers/projectContext';
import { volume2VOL } from '../utilz/utilz';
import './Nav.css';
import Query from './Query';
import TOC from './TOC';

// interface Props {
//   projects: Accessor<IProject[] | undefined>;
//   project: Accessor<IProject | undefined>;
//   setProject: Setter<IProject | undefined>;
// }
function Nav() {
  const { project } = useProject();
  return (
    <div class="nav">
      <div class="title-container">
        <div class="nav-hover" tabIndex={0}>
          <em class="emINDEX">
            <span>emergency</span>
            INDEX
          </em>
        </div>
      </div>

      <div class="nav-right-container">
        <div class="query">
          <Query />
        </div>
        <div class="volume">{volume2VOL(project()?.volume)}</div>
        <div class="page">
          <TOC />
        </div>
      </div>
    </div>
  );
}

export default Nav;
