import { navigate } from "./useRoute";
export default function Link({href,onClick,className,children}) {
    return <button onClick={(e)=>{
        if (onClick) 
            if (onClick()) return
        // confirm("link")
        
        navigate(href)
    }} className={`cursor-pointer ${className}`}>{children}</button>
}