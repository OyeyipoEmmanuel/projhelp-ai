import { useNavigate } from "react-router-dom"
import { useGetAuthChanged } from "../../context/AuthChangedContext"

const Chats = () => {
    const {isLoading, user} = useGetAuthChanged()
    const navigate = useNavigate()

    !isLoading && user === null && navigate("/")

    !isLoading && console.log(user);
    
  return (
    <div>Chats</div>
  )
}

export default Chats