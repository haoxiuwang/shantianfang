import { useContext, useState,useEffect } from 'react';
import Link from "../../framework/link.jsx"    
import { setStorage } from '../libs/storage.js';


export default function Book({ctx}){  
    const [started,setStarted] = useState(false)
    const book = ctx.book||ctx.books.find(({name})=>name==ctx.last.bookid)
    
    const {start,pause} = ctx.downloads.commands
    if(!ctx.last.bookid){
        ctx.last.bookid = book.name
        setStorage("last",{bookid:book.name})
    }
    
    return (
        <div className=''>
            <Link  onClick={()=>{    
                if(!ctx.last.chapterid)
                    ctx.last.chapterid = book.chapters.find((item)=>item.exist).name 
                if(book.name==ctx.last.bookid&&ctx.last.chapterid) return                         
                setStorage("last",{chapterid:ctx.last.chapterid,bookid:book.name})
                    
                }} href="/chapter" className='w-full flex flex-col place-items-center place-content-center py-24 bg-black/70 space-y-4'>
                <div className='w-[30%] '>
                    <div style={{paddingTop:"100%",backgroundImage:`url(/assets/images/${book.cover})`}} className={`rounded-full w-full`} alt={`${book.name}封面`}></div>                    
                </div>
                <div className='font-semibold text-white' >{book.name} ({book.chapters.length}回)</div>
                {book.chapters.find((chapter)=>chapter.exist)&&(<div className='rounded-full border-slate-400 border-2 px-8 text-lg text-white font-bold'>开始播放</div>)}
            </Link>
                
         
                   
            <div className='bg-slate-400/80 py-12 px-4'>
                {book.chapters.find((chapter,i)=>!chapter.exist)&&(
                <div onClick={()=>{
                   if(started){
                    pause()
                    setStarted(false)
                    return
                   }
                    start(book)
                    setStarted(true)
                }} className='flex place-content-center'>
                        
                        <div className={`animate-pulse p-[3px] px-8 text-lg text-white cursor-pointer bg-green-400 rounded-full text-center`}><div className='text-green-800'> {book.chapters.length} - {book.chapters.filter(item=>item.exist).length}回</div>等待下载 <div className={`underline ${started?"animate-pin":""}`}>{started?"暂停":"开始"}</div></div>
                    </div>)}
            
            <div className='grid grid-cols-3  py-8 px-4 place-items-center place-content-center'>
                {book.chapters.map((chapter,i)=>{
                    const {name,url,exist} = chapter
                    return (
                    <div className='w-full text-center' key={i}> 
                        <Link className={`${exist?"":"text-green-300"}`} onClick={()=>{
                        if(!exist)return true
                        if(ctx.last.bookid==book.name&&ctx.last.chapterid==name)return 
                        ctx.audio.current.paused||ctx.audio.current.pause()                                                
                        ctx.book = book
                        ctx.chapter = chapter  
                        ctx.last.bookid = book.name
                        ctx.last.chapterid = chapter.name              
                        setStorage("last",{chapterid:name,bookid:book.name})
                        
                    }} href={`/chapter`}>
                            {name}
                        </Link>
                    </div>
                )
                }
                )}
            </div>
        </div>
    </div>
    )

}