import { CourseDataProvider } from "./CourseDataProvider";

type Config = {
  contentUrl?: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CONFIG: Config | undefined = (window as any).slider;

function App() {
  return <CourseDataProvider content_url={CONFIG?.contentUrl ?? "./"} />;
}

export default App;
