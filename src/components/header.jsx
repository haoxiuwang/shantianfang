import { useState } from "react"
import useQuota from "../libs/usequota.js"


export default function Header({ctx}) {
    const [menu,setMenu] = useState(false)
    const [started,setStarted] = useState(false)    

    const quota = useQuota()
    const {downloads} = ctx
    const {start,pause} = downloads.commands
    return <header className='p-4 z-[1000] fixed top-0 inset-x-0 flex place-items-center place-content-between'>
            <div onClick={()=>setMenu(pre=>!pre)} className={`cursor-pointer rounded-full overflow-hidden p-2 bg-black/90 flex place-items-center place-content-center text-white font-bold text-sm w-6 h-6 `}>
              M
            </div>
              {
                started&&(<div className="relative w-1/2">
                  <div className='absolute right-0 top-0 rounded-ctx px-8 animate-pulse text-center text-white bg-black/90 flex flex-col space-y-2 text-xs p-2'>
                    <div>总任务{ctx.downloads.ctx_tasks}</div>
                    <div>评书：{ctx.downloads.book}</div>
                    <div>章节：{ctx.downloads.chapter}</div>
                    <div>完成：{ctx.downloads.success+ctx.downloads.fail}</div>
                    <div>成功：{ctx.downloads.success}</div>
                    <div>失败：{ctx.downloads.fail}</div>
                </div>
              </div>)
              }
            
            {
            menu&&(
              <menu onClick={()=>{               
                setMenu(pre=>!pre)
              }} className='z-[-1] fixed inset-0 bg-white/80 flex flex-col place-content-center place-items-center space-y-8 text-5xl'>
                <div className='underline cursor-pointer' onClick={()=>{
                  started?pause():start()
                  setStarted(pre=>!pre)
                }}>{started?"暂停下载":"开始下载"}</div>
                <div className='underline cursor-pointer' onClick={async()=>{
                  await ctx.db.clear("audios")
                  ctx.books.forEach((book)=>{            
                    book.chapters.forEach((chapter)=>{chapter.exist = false})               
                  })
                   ctx.refresh()
                  }}>重置数据库</div>
                
                <div className="mt-10 text-xs font-bold bg-slate-400 text-center p-4">
                  {quota&&<div>{Math.floor(quota.quota/(1024*1024))}/{Math.floor(quota.usage/(1024*1024))}</div>}                  
                  Edition 1.0.0
                  </div>
             </menu>
            )
          }
          </header>
}