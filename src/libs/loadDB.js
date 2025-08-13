import { IDB } from './indexeddb-promise.js';
export default async (ctx) => {
    const db = ctx.db = new IDB("audioDB", 1, {
        audios: { keyPath: 'id' },
        // books: { autoIncrement: true } 
    })

    const _db = await db.open()
    if (!_db) return
    const _urls = await db.getAllKeys("audios")
  
    if (_urls && _urls.length > 0)
        _urls.forEach((_url) => {
            const _book = ctx.books.find((book) => {

                const _chapter = book.chapters.find((chapter) => {
                    if (chapter.url == _url){
                                            
                        return chapter.exist = true
                    }                        
                })
                if (_chapter) return true
            })


        })

    
   
}