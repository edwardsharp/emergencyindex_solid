import './Nav.css';
import Query from './Query';
import TOC from './TOC';

// interface Props {
//   projects: Accessor<IProject[] | undefined>;
//   project: Accessor<IProject | undefined>;
//   setProject: Setter<IProject | undefined>;
// }
function Nav() {
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
          <Query />
        </div>
        <div class="page">
          <TOC />
        </div>
      </div>
    </div>
  );
}

export default Nav;
