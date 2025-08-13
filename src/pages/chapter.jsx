import { useContext ,useRef, useState,useEffect, useCallback} from 'react';
import Link from "../../framework/link.jsx"
import { setStorage } from '../libs/storage.js';

export default function Chapter({ctx}){
  
    const [_,refresh] = useState(false)
    let chapter = ctx.chapter  
    
    if(!chapter&&ctx.last.chapterid){
        ctx.book = ctx.books.find((book)=>book.name==ctx.last.bookid)
        ctx.chapter = chapter = ctx.book.chapters.find((_chapter)=>_chapter.name==ctx.last.chapterid)
        const fn = async()=>{
            const {blob} = await ctx.db.get("audios",chapter.url)
            console.log({blob});            
            ctx.audio.current.src = URL.createObjectURL(blob)
        }
        fn()        
    }  
    
    if(!chapter)return
    ctx.book = chapter.book
    const player = ctx.audio.current  
    return (     
            
            <div onClick={()=>{ 
                    player.paused?player.play():player.pause()                    
                    ctx.refresh()
                }} className='cursor-pointer fixed inset-0 bg-black/70 flex flex-col place-items-center place-content-center space-y-2'>
                    
                <div className='w-full flex flex-col space-y-10 place-items-center '>
                   <Link to="/book" className={`absolute inset-x-0 top-4  p-8 text-lg text-center ${player.paused?"":"animate-pulse"}`}> <div className='text-white text font-thin'>{ctx.book.name} - {chapter.name} </div>
                         
                   </Link>
                    <div className='w-full flex flex-col place-items-center place-content-center'>
                        <div style={{backgroundImage:`url(/assets/images/${ctx.book.cover})`}} className={`rounded-full bg-cover bg-center bg-no-repeat w-[80%] aspect-square  ${player&&!player.paused?"animate-spin":""}`} src={`/assets/images/${ctx.book.cover}`}></div>
                       
                    </div>
                    <div className='absolute bottom-20 w-full flex place-items-center place-content-center space-x-2'>
                        <div className=' px-6 bg-green-200 rounded-full' onClick={(e)=>{  
                       
                            e.stopPropagation()
                            ctx.audio.next(-1)   
                                          
                        
                        }}>上一回</div>
                        <div className='px-6 bg-green-200 rounded-full' onClick={(e)=>{  
                        
                            e.stopPropagation()
                            console.log("next");
                            
                            ctx.audio.next()   
                                      
                        
                        }}>下一回</div>
                    </div>
                    
                </div>
            </div>               
       
    )

  
    
}