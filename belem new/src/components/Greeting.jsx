import { useNavigate } from 'react-router-dom'

export const Greeting = () => {
    const navigate = useNavigate();
    return (
        <main className="relative h-screen w-screen bg-[url('/greetingBackFon.png')] bg-cover bg-center bg-fixed">
            <div className="absolute bottom-42 left-0 w-full flex justify-center gap-20">
                <button className="bg-transparent p-0 inline-flex items-center justify-center" onClick={() => navigate('/documents')}>
                    <img src="/btn_document.png" alt="Документ" className="h-20" />
                </button>
                <button className="bg-transparent p-0 inline-flex items-center justify-center">
                    <img src="/btn_posobie.png" alt="Пособие" className="h-20" />
                </button>
            </div>
        </main>
    )
}

export default Greeting;    