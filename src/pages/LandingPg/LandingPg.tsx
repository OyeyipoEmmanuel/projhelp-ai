import CTAbuttons from "../../components/Buttons/CTAbuttons"
import landingPgImg from "../../assets/landingPgImg.webp"
import { useNavigate } from "react-router-dom"



const LandingPg = () => {

    const navigate = useNavigate()

    return (
        <main className="relative flex flex-col items-center justify-between space-y-4 px-4 pt-6 md:flex-row md:space-y-0 md:space-x-6 md:py-24">
            {/* Spinning square */}
            <section className="absolute w-18 h-18 border border-purple-400 rounded-md top-[10%] md:left-[50%] right-12 animate-spin [animation-duration:8s]"></section>

            <section className="md:w-[50%] md:flex md:flex-col md:space-y-6">
                <div className="bg-[#E9E8FF] text-center rounded-full px-3 py-1 text-[#702FED] border border-[#DDD6FF] md:w-fit">
                    ✨ Powered by Gemini 2.0 Flash
                </div>

                <div className="mt-8 ">
                    <h1 className="text-3xl text-center mb-4 md:text-5xl md:text-start">Turn Ideas Into Organized Project</h1>
                    <p className="text-lg text-black/50 text-center md:text-xl md:text-start">Powered by AI to break down your ideas, define project sections, and assign tasks to each teammate.</p>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 mt-4 md:flex-row md:space-y-0 md:space-x-4">
                    <CTAbuttons btnName="Get Started" className="w-full bg-[#5837F8] text-white" onClick={()=>navigate("/chat")} />
                    <CTAbuttons btnName="Watch Demo" className="w-full bg-transparent border border-black/20 text-black" onClick={() => alert("Coming Soon!")} />
                </div>

                <div className="mt-3 flex flex-row justify-center items-center space-x-3 md:justify-start">
                    <span className="flex flex-row items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full "></div>
                        <p className="text-black/70 text-[15px]">No Login Required</p>
                    </span>

                    <span className="flex flex-row items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full "></div>
                        <p className="text-black/70 text-[15px]">No Credit Cart Required</p>
                    </span>
                </div>
            </section>

            <section className="bg-white shadow-xl mb-2 rounded-xl md:w-[45%]">
                <img src={landingPgImg} alt="projhelp-ai" className="p-5 rounded-4xl " />
            </section>
        </main>
    )
}

export default LandingPg