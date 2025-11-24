import { FiSend } from "react-icons/fi";

const ChatInput = () => {
    return (
        <section className=" rounded-xl border border-[#5737f874] shadow-md flex flex-row items-center justify-between space-x-4 px-3">
            <textarea
                //   value={input}
                //   onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your project idea..."
                className="w-[90%] flex-1 resize-none bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 min-h-[70px] max-h-[100px] py-3 px-2"
                rows={1}
                style={{
                    height: 'auto',
                    minHeight: '70px',
                }}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                }}
            />

            <button className=" bg-[#5837F8] p-3 rounded-lg text-center hover:opacity-80 hover:transition-all hover:duration-200 cursor-pointer">
                <FiSend className="text-lg text-white"/>
            </button>
        </section>
    )
}

export default ChatInput