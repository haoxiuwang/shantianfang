import { useEffect,useState } from 'react';
import Link from "../../framework/link.jsx"
import { setStorage } from '../libs/storage.js';
export default function Books({ctx}) {
   
    const {bookid,chapterid} = ctx.last
    const books = ctx.books    
   
    return (     
        <div className=''>            
            <div className=''>
                <div className=' flex p-4 py-24 place-items-center text-white flex-col space-y-2'>
                    <div className='text-4xl font-semibold'>单田芳评书</div>
                    <button className=' font-light text-gray-200 text-lg bg-slate-400 px-8'>收录 {books.length} 部</button> 
                </div>
                <div className='flex flex-col place-items-center space-y-8 p-24 px-8 bg-slate-400/80'>
                {books.map((book, i) => {                                  
                    return (
                    <div className={`cursor-pointer w-full rounded-lg ${ctx.last.bookid==book.name?"border-2 border-solid border-green-400":""}`}  key={i} >
                        <Link onClick={
                        ()=>{  
                            if(book.freed)return true                            
                            ctx.book = book                                      
                        }
                    } className=" w-full" href={`/book`}>
                            <div className='flex flex-col bg-slate-200 place-items-center p-4 space-y-2 text-gray-400 text-sm font-light'>
                                <div className='w-full rounded-full overflow-hidden'>
                                    <div style={{paddingTop:"100%",backgroundImage:`url(assets/images/${book.cover})`}} className={`w-full bg-cover overflow-hidden`}>
                                   
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-2 place-content-center place-items-center p-2'>
                                    <div className=' text-black text-2xl'>{book.name}</div> 
                                        <div onContextMenu={async (e) => {
                                            e.preventDefault()
                                            const handler = async (chapter) => {
                                                    try {
                                                        await ctx.db.delete("audios", chapter.url)
                                                        chapter.exist = false
                                                    } catch (error) {
                                                        console.log(error)
                                                    }
                                                }
                                            if (!book.freed) {
                                                await Promise.all(book.chapters.filter((chapter) => chapter.exist).map(handler))
                                                console.log(ctx.freed,"000")
                                                if(ctx.freed!=null){
                                                    ctx.freed.push(book.name)
                                                }
                                                else{
                                                    ctx.freed = [book.name]
                                                }
                                            }  
                                            else {
                                                ctx.freed = ctx.freed.filter((item)=>item!=book.name)  
                                            }
                                            setStorage("freed",ctx.freed)
                                            book.freed = book.freed ? false : true
                                            ctx.refresh()
                                        }} className={`${book.freed?"border-red-600 border-dashed border-b-2":""} `}>下载进度 {book.chapters.filter((item)=>item.exist).length} / {book.chapters.length}</div>                                  
                                </div>
                                
                            </div>
                    </Link>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
        
    );
}