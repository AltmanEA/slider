import { useState } from "react";
import { CourseData } from "./CourseDataProvider";
import Slide from "./Slide";
import Reveal from "./Reveal";

export class SlideIndex {
  constructor(public theme: number = 0, public slide: number = 0) {}
}

export default function SlideSelector({
  courseData,
  content_url
}: {
  courseData: CourseData;
  content_url: string
}) {
  const [currentSlide, setCurrentSlide] = useState(new SlideIndex());
  const theme = courseData.themes[currentSlide.theme];
  const slide = theme.slides[currentSlide.slide];  
  const url = content_url + theme.url + "/" + slide.url
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
      <Slide url={url}/>
      {/* <Reveal /> */}
    </div>
  );
}
