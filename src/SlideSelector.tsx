import { useState } from "react";import { CourseData } from "./CourseDataProvider";
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
  const [currentSlide, setCurrentSlide] = useState(new SlideIndex());
  const theme = courseData.themes[currentSlide.theme];
  const slide = theme.slides[currentSlide.slide];
  const url = content_url + theme.url + "/" + slide.url;

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

  return (
    <div>
      <select
        value={currentSlide.theme}
        onChange={(e) =>
          setCurrentSlide(new SlideIndex(parseInt(e.target.value)))
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
          setCurrentSlide(
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
      <button onClick={() => setCurrentSlide(prev_slide())}>{"<"}</button>
      <button onClick={() => setCurrentSlide(next_slide())}>{">"}</button>
      <Slide url={url} />
      {/* <Reveal /> */}
    </div>
  );
}
