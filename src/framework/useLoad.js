import { useRef, useState } from "react";

export default function useLoad() {
    const [ctx] = useState({})
    return ctx
}