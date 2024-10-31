import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// @ts-ignore
import { init_reveal } from "./reveal_init.js";

const reveal_root = document.getElementById("reveal_root")!;

export default function Slide({ url }: { url: string }) {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div

  function try_destroy() {
    try {
      (window as any).Reveal.destroy();
    } catch (e) {
      console.warn("Reveal.js destroy call failed.");
    }
  }

  useEffect(() => {
    // Prevents double initialization in strict mode
    try_destroy();
    init_reveal(deckDivRef.current!, url);
    return try_destroy;
  }, [url]);

  return (
    <div>
      {createPortal(
        <div className="reveal" style={{ height: "90vh" }} ref={deckDivRef}>
          <div className="slides">
            <section
              data-markdown={url + ".md"}
              data-separator="^----$"
              data-separator-vertical="^---$"
            />
          </div>
        </div>,
        reveal_root,
        url
      )}
    </div>
  );
}
