// import Reveal from "reveal.js/dist/reveal";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/white.css";
import { makeRender } from "./render.js";

const reveal_root = document.getElementById("reveal_root")!;


export default function Slide({ url }: { url: string }) {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal | null>(null); // reference to deck reveal instance

  const renderer = makeRender(url)

  function try_destroy() {
    try {
      if (deckRef.current) {
        deckRef.current.destroy();
        deckRef.current = null;
      }
    } catch (e) {
      console.warn("Reveal.js destroy call failed.");
    }
  }

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return try_destroy;

    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: "slide",
      plugins: [Markdown],
      markdown: {
        renderer
      }
    });

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
    });

    return try_destroy;
  }, [renderer, url]);

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

