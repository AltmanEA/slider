import { marked } from "marked"

export function makeRender(url) {
    const makeUrl = (urlString) => {
        if (urlString.indexOf('http://') === 0 || urlString.indexOf('https://') === 0)
            return urlString
        else
            return url + "/" + urlString
    }

    const render = new marked.Renderer()

    render.image = function (href, title, text) {
        return `<img src=${makeUrl(href)} />`
    }
    render.link = function (href, title, text) {
        return `<a href=${makeUrl(href)}>${text}</a>`
    }
    render.html = function (html, block) {       
        let result = srcReplace(html, "<img src=")
        result = srcReplace(result, "<a href=")
        return result
    }

    return render

    function srcReplace(source, tag){
        let last = 0
        while(last>=0) {
            [source, last] = srcReplaceOne(source, tag, last)
        }
        return source
    }

    function srcReplaceOne(source, tag, start) {        
        const start_index = source.indexOf(tag, start)        
        if(start_index<0)
            return [source, -1]        
        const end_index = source.indexOf("\"", start_index + tag.length + 2)
        const filename = source.slice(start_index + tag.length + 1, end_index)
        return [source.replace(filename, makeUrl(filename)), start+start_index+1]
    }
}