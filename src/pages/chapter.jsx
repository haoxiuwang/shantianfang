import { useContext ,useRef, useState,useEffect, useCallback} from 'react';
import Link from "../../framework/link.jsx"
import { setStorage } from '../libs/storage.js';

export default function Chapter({ctx}){
  
    const [_,refresh] = useState(false)
    console.log("abc:",ctx.last.chapterid)
    useEffect(() => {  
        const handler = async()=>{
            ctx.book = ctx.book||ctx.books.find(({ name }) => name == ctx.last.bookid)        
            ctx.chapter = ctx.book.chapters.find(({ name }) => name == ctx.last.chapterid)
            if(!ctx.audio.current.paused){
                ctx.refresh()
                return
            }
            console.log(ctx.chapter.name,"chapter",ctx.last.chapterid)
            await ctx.audio.load()                    
            ctx.refresh()
        }
        handler()
        
    }, [ctx.last.chapterid])

    if(!ctx.chapter||!ctx.audio.current)return
    const {book,chapter} = ctx
  
    const player = ctx.audio.current
   
    return (     
            
            <div onClick={()=>{ 
                    player.paused?player.play():player.pause()                    
                    ctx.refresh()
                }} className='cursor-pointer fixed inset-0 bg-black/70 flex flex-col place-items-center place-content-center space-y-2'>
                    
                <div className='w-full flex flex-col space-y-10 place-items-center '>
                   <Link to="/book" className={`absolute inset-x-0 top-4  p-8 text-lg text-center ${player.paused?"":"animate-pulse"}`}> <div className='text-white text font-thin'>{book.name} - {chapter.name} </div>
                         
                   </Link>
                    <div className='w-full flex flex-col place-items-center place-content-center'>
                        <div style={{backgroundImage:`url(/assets/images/${book.cover})`}} className={`rounded-full bg-cover bg-center bg-no-repeat w-[80%] aspect-square  ${player&&!player.paused?"animate-spin":""}`} src={`/assets/images/${book.cover}`}></div>
                       
                    </div>
                    <div className='absolute bottom-20 w-full flex place-items-center place-content-center space-x-2'>
                        <div className=' px-6 bg-green-200 rounded-full' onClick={(e)=>{  
                       
                            e.stopPropagation()
                            ctx.audio.next(-1)   
                            // ctx.refresh()                 
                        
                        }}>上一回</div>
                        <div className='px-6 bg-green-200 rounded-full' onClick={(e)=>{  
                        
                            e.stopPropagation()
                            ctx.audio.next()   
                            // ctx.refresh()                 
                        
                        }}>下一回</div>
                    </div>
                    
                </div>
            </div>               
       
    )

  
    
}