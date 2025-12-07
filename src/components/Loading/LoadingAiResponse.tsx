

const LoadingAiResponse = () => {
    return (
        <section className='absolute top-0 mx-auto left-0 w-full flex items-center justify-center  text-white '>
            <div className='w-full min-h-screen absolute top-0 left-0 bg-black/50'></div>
            <div className='bg-[#5837F8] px-6 py-2 rounded-md shadow-xl z-40 absolute top-10 animate-pulse'>Thinking...</div>
            {/* <div className="flex items-center justify-center h-screen">
                <img src={thinkingGif} alt="thinking" className="w-[60%] rounded-xl" />
            </div> */}
            
        </section>
    )
}

export default LoadingAiResponse