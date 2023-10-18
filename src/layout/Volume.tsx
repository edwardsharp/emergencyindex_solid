import { onMount, onCleanup, Show } from 'solid-js';
import Nav from './Nav';
import Project from '../project/Project';
import { useProject } from '../providers/projectContext';

function Volume() {
  const { allProjects, prevProject, nextProject, searchInputFocused } =
    useProject();

  onMount(() => {
    // touch gesture detection stuff
    // Math.tan to prevent extra noise
    let pageWidth = window.innerWidth || document.body.clientWidth;
    let treshold = Math.max(1, Math.floor(0.01 * pageWidth));
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const limit = Math.tan(((45 * 1.5) / 180) * Math.PI);

    function handleGesture() {
      let x = touchendX - touchstartX;
      let y = touchendY - touchstartY;
      let xy = Math.abs(x / y);
      let yx = Math.abs(y / x);
      if (Math.abs(x) > treshold || Math.abs(y) > treshold) {
        if (xy <= limit) {
          if (y < 0) {
            console.log('top');
            return;
          } else {
            console.log('bottom');
            return;
          }
        }
        if (yx <= limit) {
          if (x < 0) {
            console.log('left');
            nextProject();
          } else {
            console.log('right');
            prevProject();
          }
        }
      } else {
        console.log('tap');
      }
    }

    // touch event listenerz
    const touchstart = (event: TouchEvent) => {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    };
    const touchend = (event: TouchEvent) => {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture();
    };
    document.addEventListener('touchstart', touchstart, false);
    document.addEventListener('touchend', touchend, false);

    // key nav stuff
    const keydown = (event: KeyboardEvent) => {
      if (searchInputFocused()) return;
      switch (event.key) {
        case 'ArrowLeft':
          prevProject();
          break;
        case 'ArrowRight':
          nextProject();
          break;
      }
    };
    document.addEventListener('keydown', keydown);

    // remove listeners!
    onCleanup(() => {
      document.removeEventListener('touchend', touchend);
      document.removeEventListener('touchstart', touchstart);
      document.removeEventListener('keydown', keydown);
    });
  });

  return (
    <Show when={!allProjects.loading} fallback={<div>L O A D I N G . . .</div>}>
      <Project />
      <Nav />
    </Show>
  );
}

export default Volume;
