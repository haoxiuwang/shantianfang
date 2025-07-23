import { useEffect, useState } from "react";

export function useRoute() {
    const [path,setPath] = useState(null)
    useEffect(() => {        
        const handlePopstate = () => {
            setPath(location.pathname)          
        };
        window.addEventListener('popstate', handlePopstate);        
        setPath(location.pathname) 
        return () => window.removeEventListener('popstate', handlePopstate);
    }, []);  
    
    return path   
}

export function navigate(href) {
  window.history.pushState(null, '', href)
  const navEvent = new PopStateEvent('popstate')
  window.dispatchEvent(navEvent)
}
