import { useState, useEffect, useRef } from "react";
import config from "./config"
export default function useDownload(ctx) {
    
    const limit = config.concurrency
    const [counter, setCounter] = useState(limit)
    const opened = useRef(false)
    const tasks = useRef(null)
    const handler = async (task) => {
        
        const [url, book, chapter] = task
        console.log("开始任务：",{url, book, chapter})
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            ctx.db.add("audios",{ id: url, blob })
            ctx.books.find(({ name }) => name == book)
                .chapters.find((_chapter) => {
                    if (_chapter.name == chapter) {
                        // _chapter.size = blob.size                        
                        return _chapter.exist = true
                    }
                        
                })
            ctx.downloads.book = book
            ctx.downloads.chapter = chapter
            ctx.downloads.success++
            console.log("成功：",ctx.downloads.success)
            console.log("complete:", { url, book, chapter })
            
        } catch (error) {
            ctx.downloads.book = book
            ctx.downloads.chapter = chapter
            ctx.downloads.fail++
            console.log("失败：",ctx.downloads.fail)
            console.error("error:", { url, book, chapter, error });
        }   
        finally {
            ctx.refresh()
            if(opened.current)
            setCounter(pre => pre - 1)
        }
    }    
   
    useEffect(() => {
        if (counter == limit) return
        for (let index = 0; index < limit - counter; index++){
            const task = tasks.current.shift()
            if(!task){                
                return
            }
            handler(task)
        }            
        setCounter(limit)
    }, [counter])
    return {
        start: (target) => {  
            opened.current = true
            if(tasks.current){
                setCounter(0)
                return
            }
            if(!target)        
            tasks.current = ctx.books.filter(({freed})=>!freed).reduce((last, book) => {
                const _tasks = book.chapters.filter((chapter) => !chapter.exist)
                    .map(({ url, name }) => [url, book.name, name])
                    
                return [...last, ..._tasks]
            }, [])  
            if(target) 
                tasks.current = target.chapters.filter((chapter) => !chapter.exist)
                    .map(({ url, name }) => [url, target.name, name])                            
            ctx.downloads.ctx_tasks = tasks.current.length
            setCounter(0)
        },
        pause: () => {
            opened.current = false
            setCounter(limit)
        }        
    }
}

