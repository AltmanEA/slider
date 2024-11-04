import { useEffect, useState } from "react";
import { CourseData } from "./CourseDataProvider";
import Slide from "./Slide";

export class SlideIndex {
  constructor(public theme: number = 0, public slide: number = 0) {}
}

export default function SlideSelector({
  courseData,
  content_url,
}: {
  courseData: CourseData;
  content_url: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(getSlideIndex());
  const theme = courseData.themes[currentSlide.theme];
  const slide = theme.slides[currentSlide.slide];
  const url = content_url + theme.url + "/" + slide.url;

  function change_slide(index: SlideIndex) {
    setCurrentSlide(index);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("indexh", "0");
    urlParams.set("indexv", "0");
    window.history.replaceState({}, "", "?" + urlParams.toString());
  }

  function next_slide() {
    if (currentSlide.slide + 1 >= theme.slides.length) {
      if (currentSlide.theme + 1 >= courseData.themes.length) {
        return new SlideIndex(0, 0);
      }
      return new SlideIndex(currentSlide.theme + 1, 0);
    }
    return new SlideIndex(currentSlide.theme, currentSlide.slide + 1);
  }

  function prev_slide() {
    if (currentSlide.slide == 0) {
      if (currentSlide.theme == 0) {
        return new SlideIndex(0, 0);
      }
      return new SlideIndex(
        currentSlide.theme - 1,
        courseData.themes[currentSlide.theme - 1].slides.length - 1
      );
    }
    return new SlideIndex(currentSlide.theme, currentSlide.slide - 1);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("theme", currentSlide.theme.toString());
    urlParams.set("slide", currentSlide.slide.toString());
    window.history.replaceState({}, "", "?" + urlParams.toString());    
  })

  return (
    <div>
      <select
        value={currentSlide.theme}
        onChange={(e) =>
          change_slide(new SlideIndex(parseInt(e.target.value)))
        }
      >
        {courseData.themes.map((s, i) => (
          <option key={i} value={i}>
            {s.title}
          </option>
        ))}
      </select>
      <select
        value={currentSlide.slide}
        onChange={(e) =>
          change_slide(
            new SlideIndex(currentSlide.theme, parseInt(e.target.value))
          )
        }
      >
        {theme.slides.map((s, i) => (
          <option key={i} value={i}>
            {s.title}
          </option>
        ))}
      </select>
      <button onClick={() => change_slide(prev_slide())}>{"<"}</button>
      <button onClick={() => change_slide(next_slide())}>{">"}</button>
      <Slide url={url} />
      {/* <Reveal /> */}
    </div>
  );
}

function getSlideIndex() {
  const urlParams = new URLSearchParams(window.location.search);
  const theme = parseInt(urlParams.get("theme")??"0")??0;
  const slide = parseInt(urlParams.get("slide")??"0")??0;
  return new SlideIndex(theme, slide);
}