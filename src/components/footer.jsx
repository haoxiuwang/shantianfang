import { useEffect, useState,useRef } from "react"
import Link from "../../framework/Link"
export default function Footer({ctx}) {    
    
    return (<footer className='bg-slate-400 flex place-items-center fixed inset-x-0 bottom-0 p-4 py-2 text-xs z-[10000]'>
        <Link href={ctx.path=="/chapter"?"/book":ctx.path=="/"?"/book":"/"}>
            <div className="flex rounded-full bg-slate-100 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" ><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
            </div>
        </Link>
        <div className="grow h-full">
          {(ctx.audio.current&&ctx.audio.current.src)&&(<Progress {...{ctx}}/>)}
        </div>
        <div className="h-full">
          {(ctx.audio.current&&ctx.audio.current.src)&&(
            <Link className={`border-[1px] border-white cursor-pointer h-8 aspect-square object-cover rounded-full overflow-hidden ${ctx.audio.current.paused?"":"animate-spin"}`} href="/chapter">
              <img src={`assets/images/${ctx.books.find(({name})=>name==ctx.last.bookid).cover}`} />
            </Link>)}
        </div>
        
      
      </footer>)
}

function Progress({ctx}) {
  const [_,refresh] = useState(false)
  const a = useRef(null)
  const b = useRef(null)

  const ratioRef = useRef(0)
  useEffect(()=>{ 
        ctx.audio.current.ontimeupdate = ()=>{
        ratioRef.current = ctx.audio.current.currentTime*100/ctx.audio.current.duration
        refresh(p=>!p)
    }
    return ()=>{ctx.audio.current.ontimeupdate = null}
  },[])
  // console.log(ratioRef.current,"---")
  return (<div onClick={(e)=>{
    const rect = a.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    // const relativeY = e.clientY - rect.top;
    const ratio = relativeX/a.current.offsetWidth   
    ctx.audio.current.currentTime = ctx.audio.current.duration*ratio
  }} ref={a} className="relative h-6">
    <div ref={b} style={{left:ratioRef.current+"%"}} className={`absolute top-0 w-0 h-full border-r-2 border-solid border-green-800 ${ctx.audio.current.paused?"":"animate-ping"}`}></div>
  </div>)
}