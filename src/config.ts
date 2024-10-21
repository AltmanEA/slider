import Markdown from "reveal.js/plugin/markdown/markdown";
// import Highlight from "reveal.js/plugin/highlight/highlight";

export type Config = {
  contentUrl?: string;
  highlight?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let PLUGINS: any[] = [];

export async function config_plugin() {
  const CONFIG: Config | undefined = (window as any).slider;  
  const Highlight = CONFIG?.highlight ?? true
    ? (await import("reveal.js/plugin/highlight/highlight")).default
    : undefined;

  PLUGINS = [Markdown, Highlight].filter((p) => p !== undefined);
  console.log(Highlight);
  return Highlight;
}
