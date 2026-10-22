import {useState} from "react";

export default function Form()
{
    const [name, setName] = useState("");

    function handleSubmit(e)
    {
        e.preventDefault();
        console.log(name);
    }
    return(
        <form method="POST" onSubmit={handleSubmit}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <button>Submit</button>
        </form>
    )
}