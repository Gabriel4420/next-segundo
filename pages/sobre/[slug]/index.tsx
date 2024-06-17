import { useRouter } from "next/router"

const SobreItem = () => {
    const { slug } = useRouter().query
    return (
        <h1>Pagina sobre {slug}</h1>
    )
}

export default SobreItem