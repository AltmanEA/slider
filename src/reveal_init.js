import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/white.css";
import "./github.css";
import Markdown from "reveal.js/plugin/markdown/markdown";
import { makeRender } from "./render";

let plugins = [];

export async function init_reveal(element, url) {
    const renderer = makeRender(url);

    const reveal = new Reveal(element, {
        plugins: plugins,
        audio: {
            prefix: url + "/",
            suffix: '.mp3',
            advance: -1
        },
        markdown: {
            renderer,
        },
    });

    reveal.initialize().then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const indexh = parseInt(urlParams.get("indexh")??"0")??0;
        const indexv = parseInt(urlParams.get("indexv")??"0")??0;
        reveal.slide(indexh, indexv);
    });

    reveal.on("slidechanged", (event) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("indexh", event.indexh.toString());
        urlParams.set("indexv", event.indexv.toString());        
        window.history.replaceState({}, "", "?" + urlParams.toString());
    });
    window.Reveal = reveal    
    return reveal;
}


export async function init_plugin() {
    const config = window.slider;
    const Highlight = config?.highlight ?? true
        ? (await import("reveal.js/plugin/highlight/highlight")).default
        : undefined;

    if (config?.audio) {
        await loadScriptPromise("./audio-slideshow/plugin.js");
        if (config?.audioRecorder) {
            await loadScriptPromise("./audio-slideshow/RecordRTC.js");
            await loadScriptPromise("./audio-slideshow/jszip.min.js");
            await loadScriptPromise("./audio-slideshow/recorder.js");
        }
    }
    plugins = [
        Markdown,
        Highlight,
        window.RevealAudioSlideshow,
        window.RevealAudioRecorder
    ].filter((p) => p !== undefined);
}


//
//  https://learn.javascript.ru/promisify
// 
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));

    document.head.append(script);
}
// использование:
// loadScript('path/script.js', (err, script) => {...})

let loadScriptPromise = function (src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err)
            else resolve(script);
        });
    })
}
// использование:
// loadScriptPromise('path/script.js').then(...)