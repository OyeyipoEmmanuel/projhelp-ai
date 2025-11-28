import { FaRobot } from 'react-icons/fa'
import { RiUserLine } from 'react-icons/ri'
import { type MessageType } from '../../api/chats/getMessages'
import React, { useState } from 'react';
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";



type MessageBubblePropsType = {
    message: MessageType;
    messageTxt: string
    idx: number
}

const MessageBubble = ({ message, messageTxt, idx }: MessageBubblePropsType) => {
    const [msgCopied, setMsgCopied] = useState(false)

    //time to HH:MM
    const time = message.createdAt && message.createdAt ? message.createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    }) : "00:00"

    // Copy to clipboard
    const handleCopy = (textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy)

        setMsgCopied(true)

        setTimeout(()=>{
            setMsgCopied(false)
        }, 1000)
    }

    return (

        <section key={idx} className={`flex items-start w-full space-x-3  ${message.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}>
            <div className={`${message.sender === "bot" ? "bg-[#5837F8]" : "bg-gray-200"} p-2 rounded-full text-white`}>
                {message.sender === "bot" ? <FaRobot className="" /> : <RiUserLine className="text-black" />}
            </div>

            <div className="w-[70%] flex flex-col space-y-1">
                <div
                    className={`w-full ${message.sender === "bot"
                        ? "border border-gray-200 bg-white p-3 shadow-lg"
                        : "py-3 bg-[#0F172B] text-white"
                        } px-3 rounded-lg`}
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    {messageTxt.split("\n").map((line, idx) => {
                        // check if line is marked bold with ** at start and end
                        const isBold = line.startsWith("**") && line.endsWith("**");
                        const text = line.replace(/\*\*/g, ""); // remove ** markers

                        return (
                            <div
                                key={idx}
                                style={{
                                    fontWeight: isBold ? "bold" : "normal",
                                    marginBottom: 4, // optional spacing between lines
                                }}
                            >
                                {text}
                            </div>
                        );
                    })}
                </div>


                <div className='flex justify-between'>
                    <span className={`text-black/50 text-xs ${message.sender === "user" && "place-self-end"}`}>
                        {time}
                    </span>
                    {message.sender === "bot" && <span className={``}>

                        {!msgCopied ? 
                            <FaRegCopy className='text-[14px] cursor-pointer' title='copy' onClick={() => handleCopy(messageTxt)} /> :
                            <FaCheck />
                        }

                    </span>
                    }
                </div>
            </div>
        </section>
    )
}

export default React.memo(MessageBubble)