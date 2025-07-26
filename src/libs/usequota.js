import { useEffect, useState } from "react";

export default function useQuota(params) {
    const [q,setQ] = useState(null)
    useEffect(()=>{
        (async()=>{
            if(!navigator.storage)return  
            const quota = await navigator.storage.estimate()   
            // if (!await navigator.storage.persisted()) {
                
            //     // const answer = confirm("请允许持久化存储以避免数据丢失");
            //     // if (answer) {
                    const granted = await navigator.storage.persist();
                    // console.log({quota})
            //     //     alert(granted ? "设置成功" : "请手动调整浏览器权限");
            //     // }
            // }   
            setQ(quota)
        })()
    },[])
    return q
}