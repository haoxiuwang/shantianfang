import { useState, useEffect } from "react"
import books from "./books.js"
import loadDB from "./loadDB.js"
import config from "./config.js"
import initAudio from "./initaudio.js"
import useDownload from "./usedownload.js"
import { loadStorage, setStorage } from "./storage.js";
import { useRoute, navigate } from '../../framework/useRoute.js'
import usePage from '../../framework/usePage.js'


export default function useLoad() {

    const [a, refresh] = useState(false)
    const [ctx] = useState({
        books, setStorage, total_size:0,
        refresh: () => { refresh(pre => !pre) },
        audio: { current: null, load: null, next: null, ratio: 0 },
        last: { bookid: null, chapterid: null },
        downloads: { _book: null, _chapter: null, "all_tasks": null, "waiting_tasks": null, success: 0, fail: 0 }
    })
    const path = useRoute()
    const Page = usePage(path)
 
    ctx.path = path
    ctx.Page = Page
    ctx.navigate = navigate
    const { start, pause } = useDownload(ctx)
    ctx.downloads.commands = { start, pause }
    const init_audio = initAudio(ctx)
    useEffect(() => {
        if (!ctx) return
        const init = async () => {
            init_audio()
            ctx.books = books.filter(({ name }) => {
                const result = config.excludes.find((item) => {
                    if (item == name) {
                        return true
                    }
                })
                if (!result) return true
            })

            ctx.books.map((book) => {
                book.chapters.sort((a, b) => {
                    const x = parseInt(a.name), y = parseInt(b.name)
                    const r = x - y
                    return r
                })

            })
            await loadDB(ctx)
            loadStorage([["last", true], ["freed", true]], ctx)
            if (ctx.freed)
                ctx.freed.map((bookname) => {
                    ctx.books.find((book) => {
                        if (book.name == bookname)
                            return book.freed = true
                    })
                })
            ctx.refresh()
        }

        init()


        return () => {
            if (ctx.db)
                ctx.db.close()
        }
    }, [])
    return ctx
}