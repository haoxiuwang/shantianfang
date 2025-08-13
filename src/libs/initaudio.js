import { useEffect, useState } from "react";

export default function initAudio( ctx ) {
   
    ctx.audio.load = async () => {
        if(!ctx.chapter.exist)return
        const { blob } = await ctx.db.get("audios", ctx.chapter.url)
        const src = URL.createObjectURL(blob)
        ctx.audio.current.src = src
     }
    ctx.audio.next = (val = 1) => {
        if (!ctx.book) return
        
        
        const last = ctx.last
        let x = parseInt(last.chapterid) + val
        if (val>0&&x > ctx.book.chapters.length) {
            ctx.navigate("/")            
            return
        }
        if(val<0&&x<1)return
        x = x < 10 ? "00" + x : x < 100 ? "0" + x : "" + x
        ctx.last.chapterid = x
        ctx.setStorage("last", { bookid: last.bookid, chapterid: x })
        ctx.chapter = null
        ctx.refresh()
    }
    const init = ()=>{
        const audio = new Audio()

        audio.oncanplay = () => {
            ctx.audio.current.play()
            ctx.refresh()
        }
        audio.onended = () => { 
            ctx.audio.current.paused||ctx.audio.current.pause()
            ctx.audio.next(1) 
            
        } 
        ctx.audio.current = audio
    }
    return init
}