import { Accessor } from 'solid-js';
import IProject from '../project/project.d';
import './Query.css';
import { volume2VOL } from '../utilz/utilz';

interface Props {
  project: Accessor<IProject | undefined>;
}
function Query(props: Props) {
  return (
    <div class="Query nav-hover">{volume2VOL(props.project()?.volume)}</div>
  );
}

export default Query;
