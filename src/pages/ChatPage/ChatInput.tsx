import { useState, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { addUserChat } from "../../api/chats/addUserChat";
import { askAi } from "../../api/chats/askAI";
import { useGetHistory } from "../../api/chats/getHistory";
import LoadingAiResponse from "../../components/Loading/LoadingAiResponse";

const ChatInput = () => {
    const [input, setInput] = useState<string>("")
    const [awaitingBotRes, setAwaitingBotRes] = useState<boolean>(false)

    const { message: prevMsg } = useGetHistory();


    let isSending = false

    const handleUserPrompt = async (e: FormEvent) => {
        e.preventDefault()

        setInput('');
        if (isSending) return


        isSending = true

        try {
            //Add user chat to db
            await addUserChat(input)

            // Ask ai
            setAwaitingBotRes(true)

            await askAi(input, prevMsg)

            setAwaitingBotRes(false)

        } catch (error) {
            console.error(error)
        }
        finally {
            setAwaitingBotRes(false);

            isSending = false;
        }


    }

    // console.log(awaitingBotRes)

    return (
        <>
            {awaitingBotRes && <LoadingAiResponse />}
            <form onSubmit={handleUserPrompt} className=" rounded-xl border border-[#5737f874] shadow-md flex flex-row items-center justify-between space-x-4 px-3">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your project idea..."
                    className="w-[90%] flex-1 resize-none bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 min-h-[70px] max-h-[100px] py-3 px-2"
                    rows={1}
                    required
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

                <button type="submit" disabled={isSending || input.trim().length == 0} className="bg-[#5837F8] p-3 rounded-lg text-center hover:opacity-80 hover:transition-all hover:duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
                    <FiSend className="text-lg text-white" />
                </button>
            </form>
        </>
    )
}

export default ChatInput