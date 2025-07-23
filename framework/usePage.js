import { useEffect, useState } from "react"
import { routeMap } from "./routeMap"
import { navigate } from "./useRoute";
export default function usePage(path) {

    const [page, setPage] = useState(null)
    useEffect(() => {
        const load = async () => {
            if (!path) return;
            const loader = routeMap[path];
            if (!loader) navigate("/")
            const mod = await loader();
            if (!mod || typeof mod.default !== 'function') return;
            setPage(mod);
        };

        load();
    }, [path]);

    return page
}