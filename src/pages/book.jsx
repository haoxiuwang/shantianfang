import { useContext, useState,useEffect } from 'react';
import Link from "../../framework/link.jsx"    
import { setStorage } from '../libs/storage.js';


export default function Book({ctx}){
    const book = ctx.book
    if(!ctx.book) 
       ctx.book = book = ctx.books.find(({name})=>name==ctx.last.bookid)    
    return (
        <div className=''>
            <Link  onClick={()=>{
                if(!ctx.last.chapterid){
                    ctx.chapter = book.chapters.find((item)=>item.exist) 
                    ctx.last.chapterid = ctx.chapter.name
                    ctx.last.bookid = ctx.book.name
                }                    
                if(book.name==ctx.last.bookid&&ctx.last.chapterid) {
                    ctx.chapter = book.chapters.find((chapter)=>chapter.name==ctx.last.bookid)
                    return
                }                         
                setStorage("last",{chapterid:ctx.last.chapterid,bookid:book.name})
                    
                }} href="/chapter" className='w-full flex flex-col place-items-center place-content-center py-24 bg-black/70 space-y-4'>
                <div className='w-[30%] '>
                    <div style={{paddingTop:"100%",backgroundImage:`url(/assets/images/${book.cover})`}} className={`rounded-full w-full`} alt={`${book.name}封面`}></div>                    
                </div>
                <div className='font-semibold text-white' >{book.name} ({book.chapters.length}回)</div>
                {book.chapters.find((chapter)=>chapter.exist)&&(<div className='rounded-full border-slate-400 border-2 px-8 text-lg text-white font-bold'>播放本书</div>)}
            </Link>  
            <div className='bg-slate-400/80 py-12 px-4'>
                {book.chapters.find((chapter,i)=>!chapter.exist)&&(
                <div onClick={()=>{
                    ctx.tasks = book.chapters.filter((chapter)=>!chapter.exist)
                    ctx.download(ctx)
                }} className='flex place-content-center'>                        
                    <div className={`animate-pulse p-[3px] px-8 text-lg text-white cursor-pointer bg-green-400 rounded-full text-center`}><div className='text-green-800'> {book.chapters.length} - {book.chapters.filter(item=>item.exist).length}回</div>等待下载 <div className={`underline ${ctx.timer?"":"animate-pin"}`}>{ctx.timer?"暂停":"开始"}</div></div>
                </div>)}            
            <div className='grid grid-cols-3  py-8 px-4 place-items-center place-content-center'>
                {book.chapters.map((chapter,i)=>{
                    const {name,url,exist} = chapter
                    return (
                    <div className={`w-full text-center `} key={i}> 
                        <Link className={`${exist?"":"text-green-300"} ${ctx.chapter==chapter?"underline":""}`} onClick={async()=>{
                                if (!exist) return true
                                ctx.chapter = chapter
                                const {blob} = await ctx.db.get("audios",chapter.url)
                                ctx.audio.current.src = URL.createObjectURL(blob)                                
                                if (ctx.last.bookid == book.name && ctx.last.chapterid == name) return
                                ctx.last.bookid = book.name
                                ctx.last.chapterid = chapter.name
                                setStorage("last", { chapterid: name, bookid: book.name })                        
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