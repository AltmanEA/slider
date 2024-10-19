import { useEffect, useState } from "react"
import YAML from 'yaml'
import SlideSelector from "./SlideSelector"

export type SlideData = {
    url: string
    title: string
}

export type ThemeData = {
    url: string
    title: string
    slides: SlideData[]
}

export type CourseData = {
    url: string
    title: string
    themes: ThemeData[]
}

export function CourseDataProvider({content_url}: {content_url: string}) {
    const [courseData, setCourseData] = useState<CourseData | null>(null)
    const [loadError, setLoadError] = useState<boolean>(false)

    useEffect(() => {
        fetch(content_url + "map.yaml")
            .then((response) => response.text())
            .then(
                (str) => {
                    try {
                        setCourseData(YAML.parse(str))                        
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (e) {
                        setLoadError(true)
                    }
                })
    }, []) 

    if (loadError)
        return <h1>Ошибка загрузки данных о курсе</h1>
    if (!courseData)
        return <h1>Загружаются данные о курсе</h1>

    return <SlideSelector courseData={courseData} content_url={content_url}/>

}