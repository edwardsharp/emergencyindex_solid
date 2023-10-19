import { Show } from 'solid-js';

import { useProject } from '../providers/projectContext';

export function Query() {
  const { query, iconForSearchKeyLabel } = useProject();

  return (
    <Show when={query()}>
      <div>
        {iconForSearchKeyLabel()} {query()}
      </div>
    </Show>
  );
}

export default Query;
