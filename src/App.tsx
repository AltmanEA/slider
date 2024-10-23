import { CourseDataProvider } from "./CourseDataProvider";


function App() {
  const contentUrl = (window as any).slider?.contentUrl;
  return <CourseDataProvider content_url={contentUrl ?? "./"} />;
}

export default App;
