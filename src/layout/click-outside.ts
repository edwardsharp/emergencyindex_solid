import { Accessor, onCleanup } from "solid-js";

export default function clickOutside(
  el: HTMLElement,
  accessor: Accessor<() => boolean>
) {
  const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
