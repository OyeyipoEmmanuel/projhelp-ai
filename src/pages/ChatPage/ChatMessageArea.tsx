import { useEffect, useState } from "react";
import { getAllMessages, type MessageType } from "../../api/chats/getMessages";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import MessageBubble from "../../components/MessageBubble/MessageBubble";


const ChatMessageArea = () => {

    const [messages, setMessages] = useState<MessageType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

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

    !isLoading && console.log(messages);



    return (
        <main className="flex flex-col space-y-5 max-h-[calc(90vh-120px)] overflow-y-auto">
            {error && <p>An err Occured</p>}
            {isLoading && <LoadingComponent />}
            {!isLoading && !error && messages && messages.map((message, idx) =>(<MessageBubble message={message} idx={idx}/>))}
        </main>
    )
}

export default ChatMessageArea