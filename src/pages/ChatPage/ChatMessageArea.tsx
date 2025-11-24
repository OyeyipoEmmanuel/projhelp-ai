import { FaRobot } from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";


const messages = [
    {
        text: "Hello! I'm your AI project assistant. Tell me about your project idea, and I'll help you break it down into organized sections with clear tasks and team assignments.",
        sender: "bot",
        createdAt: new Date().getDate()
    },
    {
        text: "I want to build a mobile app that helps people track their daily water intake and reminds them to stay hydrated.",
        sender: "user",
        createdAt: new Date().getDate()
    },
    {
        text: "Great idea! Let me break this down into a structured project for you. I'll organize this into key sections: Design & UX, Frontend Development, Backend & Database, Notifications System, and Testing & Launch. I'll also identify the main tasks for each section.",
        sender: "bot",
        createdAt: new Date().getDay()
    },
    {
        text: "Great idea! Let me break this down into a structured project for you. I'll organize this into key sections: Design & UX, Frontend Development, Backend & Database, Notifications System, and Testing & Launch. I'll also identify the main tasks for each section.",
        sender: "user",
        createdAt: new Date().getDay()
    },
    {
        text: "Great idea! Let me break this down into a structured project for you. I'll organize this into key sections: Design & UX, Frontend Development, Backend & Database, Notifications System, and Testing & Launch. I'll also identify the main tasks for each section.",
        sender: "bot",
        createdAt: new Date().getDay()
    },
]

const ChatMessageArea = () => {
    return (
        <main className="flex flex-col space-y-5 max-h-[calc(90vh-120px)] overflow-y-auto">
            {messages.map((message, idx) => (
                <section key={idx} className={`flex items-start  ${message.sender === "bot" ? "flex-row" : "flex-row-reverse"} space-x-3`}>
                    <div className={`${message.sender === "bot" ? "bg-[#5837F8]" : "bg-gray-200"} p-2 rounded-full text-white`}>
                        {message.sender === "bot" ? <FaRobot className=""/> : <RiUserLine className="text-black"/>}
                    </div>

                    <div className="flex flex-col space-y-1">
                        <div className={`${message.sender === "bot" ? "bg-white border border-gray-200" : "bg-[#0F172B] text-white"} p-3 rounded-lg shadow-md`}>{message.text}</div>

                        <span className={`text-black/50 text-xs ${message.sender === "user" && "place-self-end"}`}>12:20AM</span>
                    </div>
                </section>
            ))}
        </main>
    )
}

export default ChatMessageArea