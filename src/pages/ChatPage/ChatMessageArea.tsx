import { useEffect, useRef, useState } from "react";
import { getAllMessages, type MessageType } from "../../api/chats/getMessages";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import { Timestamp } from "firebase/firestore";
import Typed from 'typed.js';



const ChatMessageArea = () => {

    const [messages, setMessages] = useState<MessageType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    //ref to scroll to bottom on message entry
    const bottomRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    //Last bot msg state
    const [displayLastBotMsg, setDisplayLastBotMsg] = useState<string>("")

    //Check if same message is returned from firebase
    const lastAnimatedBotId = useRef<string | undefined>(undefined)

    useEffect(() => {
        setIsLoading(true)

        const res = getAllMessages({
            onData: (fetchedMsg: MessageType[]) => {
                setMessages(fetchedMsg)

                setIsLoading(false)
            },
            onError: (err) => {
                setError(err)
                setIsLoading(false)
            }
        })

        return () => res?.()

    }, [])

    // !isLoading && console.log(messages);

    const latestBotMsg = messages.filter((message) => message.sender === "bot").at(-1)

    // const typedRef = useRef(null);

    // useEffect(() => {
    //     if (!latestBotMsg) return;
    //     if (lastAnimatedBotId.current === latestBotMsg.id) return;

    //     lastAnimatedBotId.current = latestBotMsg.id;

    //     const fullText = latestBotMsg.text;
    //     console.log(fullText)

    //     // Make sure the element is empty before Typed.js runs
    //     // if (typedRef.current) {
    //     //     typedRef.current.textContent = "";
    //     // }

    //     const typed = new Typed(typedRef.current, {
    //         strings: [fullText],
    //         typeSpeed: 30,
    //         showCursor: false,
    //         onComplete: () => {
    //             // Optional: update state when done
    //             setDisplayLastBotMsg(fullText);
    //         }
    //     });

    //     return () => {
    //         typed.destroy();
    //     };
    // }, [latestBotMsg?.id]);

    const messageIfEmpty = {
        id: "0",
        sender: "bot",
        text: "Hello! I'm your AI project assistant. Tell me about your project idea, and I'll help you break it down with clear tasks and team assignments.",
        createdAt: Timestamp.fromDate(new Date("November 24, 2025 at 12:36:21 AM UTC+1"))
    }



    return (
        <main className="flex flex-col space-y-5 max-h-[calc(90vh-120px)] overflow-y-auto md:w-[70%] md:mx-auto ">
            {error && <p>An err Occured</p>}
            {isLoading && <LoadingComponent />}
            {messages.length === 0 && <MessageBubble message={messageIfEmpty} messageTxt={messageIfEmpty.text} idx={0} />}
            {!isLoading && !error && messages && messages.map((message, idx) => {
                const isLatestBot = message === latestBotMsg
                const txtToDisplay = message.text

                // console.log(txtToDisplay)



                return (
                    <div key={message.id} className="space-y-6">
                        <MessageBubble message={isLatestBot ? latestBotMsg : message} messageTxt={txtToDisplay} idx={idx} />
                        <div ref={bottomRef}></div>
                    </div>
                )
            })}
        </main>
    )
}

export default ChatMessageArea