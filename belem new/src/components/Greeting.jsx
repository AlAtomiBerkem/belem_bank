import { useNavigate } from 'react-router-dom'

export const Greeting = () => {
    const navigate = useNavigate();
    return (
        <main className="relative h-screen w-screen bg-[url('/greetingBackFon.png')] bg-cover bg-center bg-fixed">
            <div className="absolute bottom-95 left-90 flex flex-col justify-center gap-6 scale-[1.63]" >
                <button className="bg-transparent p-0 inline-flex items-center justify-center mb-10" onClick={() => navigate('/documents')}>
                    <img src="/btn_document.png" alt="Документ" className="h-20" />
                </button>
                <button className="bg-transparent p-0 inline-flex items-center justify-center" onClick={() => navigate('/materials')}>
                    <img src="/btn_posobie.png" alt="Пособие" className="h-20" />
                </button>
            </div>
        </main>
    )
}

export default Greeting;    