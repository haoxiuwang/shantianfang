import { navigate } from "./useRoute";
export default function Link({href,onClick,className,children}) {
    return <button onClick={async(e)=>{
        if (onClick) 
            if (await onClick()) return
        // confirm("link")
        
        navigate(href)
    }} className={`cursor-pointer ${className}`}>{children}</button>
}