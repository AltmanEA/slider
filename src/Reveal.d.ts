declare module "reveal.js" {
    export default class Reveal {
        constructor(
            element: HTMLElement,
            options: Any
        )
        initialize(): Promise<void>
        destroy(): void
    }
};
declare module "reveal.js/plugin/markdown/markdown";
// declare module "./render.js" {
//     export function makeRender(url: string): _Renderer
// };