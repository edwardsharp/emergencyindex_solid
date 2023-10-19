import { Show } from 'solid-js';

import { useProject } from '../providers/projectContext';

export function Query(props: { showCount?: boolean }) {
  const { query, iconForSearchKeyLabel, projects } = useProject();

  return (
    <div>
      <Show when={query()}>
        {iconForSearchKeyLabel()} {query()}
      </Show>{' '}
      <span title={`browsing ${projects()?.length} projects`}>
        ({projects()?.length})
      </span>
    </div>
  );
}

export default Query;
