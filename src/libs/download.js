export default function download(ctx) {    
    let counter = 0
    if(ctx.timer){
        clearInterval(ctx.timer)
        ctx.timer = null
        return
    }  
    
    const tasks = ctx.tasks
    ctx.timer = setInterval(()=>{
        for (let index = counter; index < ctx.limit; index++) {         
            let task = tasks.shift()
            if(!task){
                clearInterval(ctx.timer)
                ctx.timer = null
                return
            }
            console.log("task...");
            
            perform(task)                     
        }
        counter = ctx.limit
    },1000)

    const perform = async(task)=>{        
        
        try {
          
            const res = await fetch(task.url);
            const blob = await res.blob();
            ctx.db.add("audios",{ id: task.url, blob })                      
            ctx.downloads.success++
            console.log("成功：",ctx.downloads.success)
            console.log("complete:", { url:task.url, book:task.book.name, chapter:task.name })
            
        } catch (error) {           
            ctx.downloads.fail++
            console.log("失败：",ctx.downloads.fail)
            console.error("error:", { url:task.url, book:task.book.name, chapter:task.name });
        }   
        finally {
            console.log({task},"--");
            
            task.exist = true 
            ctx.downloads.book = task.book.name
            ctx.downloads.chapter = task.name
            counter--
            ctx.refresh()            
        }
    }


}