import { useState, useEffect } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    }, [count]);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>
                count: {count}
            </button>
        </>
    );
}

export default Counter;
