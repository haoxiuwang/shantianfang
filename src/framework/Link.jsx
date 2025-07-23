import { navigate } from "./useRoute";
export default function Link({href,onClick,className,...props}) {
    return <button {...{props}} onClick={(e)=>{
        if(onClick)onClick()
            navigate(href)
    }} className={`cursor-pointer ${className}`}></button>
}