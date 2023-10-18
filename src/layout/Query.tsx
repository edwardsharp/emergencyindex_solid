import { Show } from 'solid-js';

import { useProject } from '../providers/projectContext';

export function Query() {
  const { query } = useProject();

  return (
    <Show when={query()}>
      <div>🔎 {query()}</div>
    </Show>
  );
}

export default Query;
