// import { render } from "solid-js/web";
import { onMount } from "solid-js";

function Canvas() {
  let canvas!: HTMLCanvasElement;
  onMount(() => {
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // canvas.width =
    //   window.innerWidth ||
    //   document.documentElement.clientWidth ||
    //   document.body.clientWidth;
    // canvas.height =
    //   window.innerHeight ||
    //   document.documentElement.clientHeight ||
    //   document.body.clientHeight;
    if (!ctx) return;

    ctx.font = "48px serif";
    ctx.fillText(`Hello world!`, 5, 48);
    // ctx.textRendering = "optimizeLegibility";

    let text = ctx.measureText("Hello world!");
    console.log(text); // 56;

    // let frame = requestAnimationFrame(loop);

    // function loop(t: DOMHighResTimeStamp) {
    //   frame = requestAnimationFrame(loop);

    //   if (!ctx) return;
    //   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //   for (let p = 0; p < imageData.data.length; p += 4) {
    //     const i = p / 4;
    //     const x = i % canvas.width;
    //     const y = (i / canvas.height) >>> 0;

    //     const r = 64 + (128 * x) / canvas.width + 64 * Math.sin(t / 1000);
    //     const g = 64 + (128 * y) / canvas.height + 64 * Math.cos(t / 1000);
    //     const b = 128;

    //     imageData.data[p + 0] = r;
    //     imageData.data[p + 1] = g;
    //     imageData.data[p + 2] = b;
    //     imageData.data[p + 3] = 255;
    //   }

    //   ctx.putImageData(imageData, 0, 0);
    // }

    // onCleanup(() => cancelAnimationFrame(frame));
  });

  return <canvas ref={canvas} width="256" height="256" />;
}
export default Canvas;
// render(() => <App />, document.getElementById("app"));
