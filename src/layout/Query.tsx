import './Query.css';
import { volume2VOL } from '../utilz/utilz';
import { useProject } from '../providers/projectContext';

function Query() {
  const { project } = useProject();
  return <div class="Query nav-hover">{volume2VOL(project()?.volume)}</div>;
}

export default Query;
