import { useState } from "react"

const Exemplo = () => {
    const [count, setCount] = useState(0)
    const handleContadorBtn = () => setCount(count + 1);
    
    return (
        <div>
            <h1>Exemplo sobre ({count})</h1>
            
            <ul>
                <li>
                    <a href="/sobre/gabriel">Gab</a>
                </li>
                <li>
                    <a href="/sobre/bonieky/idade?idade=50">Bonieky</a>
                </li>
            </ul>
            
            <button onClick={handleContadorBtn}>Contador: {count}</button>

        </div>
    )
}

export default Exemplo