import { CourseDataProvider } from "./CourseDataProvider"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CONTENT_URL: string | undefined = (window as any).contentUrl


function App() {
  if(!CONTENT_URL)
          return <h1>Не задана переменная окружения CONTENT_URL</h1>
  return <CourseDataProvider content_url={CONTENT_URL}/>
}

export default App
