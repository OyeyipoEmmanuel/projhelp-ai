import { FaRobot } from 'react-icons/fa'
import { RiUserLine } from 'react-icons/ri'
import { type MessageType } from '../../api/chats/getMessages'
import type { ReactNode } from 'react';

type MessageBubblePropsType = {
    message:MessageType;
    messageTxt:ReactNode
    idx: number
}

const MessageBubble = ({message,messageTxt, idx} : MessageBubblePropsType) => {
    //time to HH:MM
    const time = message.createdAt && message.createdAt ? message.createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    }) : "00:00"

    return (
        //Write 
        <section key={idx} className={`flex items-start space3  ${message.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}>
            <div className={`${message.sender === "bot" ? "bg-[#5837F8]" : "bg-gray-200"} p-2 rounded-full text-white`}>
                {message.sender === "bot" ? <FaRobot className="" /> : <RiUserLine className="text-black" />}
            </div>

            <div className="w-[70%] flex flex-col space-y-1">
                <p className={`w-full ${message.sender === "bot" ? "border-gray-200" : "py-3 bg-[#0F172B] text-white"} px-3 rounded-lg shadow-`}>{messageTxt}</p>

                <span className={`text-black/50 text-xs ${message.sender === "user" && "place-self-end"}`}>
                    {time}
                </span>
            </div>
        </section>
    )
}

export default MessageBubble