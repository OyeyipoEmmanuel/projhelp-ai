import { useNavigate } from "react-router-dom"
import { useGetAuthChanged } from "../../context/AuthChangedContext"
import { useEffect } from "react"
import useNotification from "antd/es/notification/useNotification"
import ChatMessageArea from "./ChatMessageArea"
import ChatInput from "./ChatInput"

const Chats = () => {
  const navigate = useNavigate()
  const [message, contextHolder] = useNotification()

  const { isLoading, user } = useGetAuthChanged()


  useEffect(() => {
    !isLoading && user === null && navigate("/")
    !isLoading && user && message.success({ title: "Signed in anonymously", duration: 1 })
  }, [user])

  // useEffect(() => {

  // }, [user])



  !isLoading && console.log(user);

  return (
    <main className="max-h-screen h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {contextHolder}

      <section className="px-3 pt-12 max-h-[70vh]">
        <ChatMessageArea />
      </section>

      <section className=" w-full border border-white/20 px-3 py-3">
        <ChatInput />
      </section>
    </main>
  )
}

export default Chats