import { useState } from "react"

export default function ABC() {
    const [count, setCounter] = useState(0);
    return <>
        ABC File {count}
        <button onClick={() => setCounter(count+1)}>Increment</button>
        <button onClick={() => setCounter(count-1)}>Decrement</button>
    </>
}