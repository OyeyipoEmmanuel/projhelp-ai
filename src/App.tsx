import { Route, Routes } from "react-router-dom"
import LandingPg from "./pages/LandingPg/LandingPg"
import Chats from "./pages/ChatPage/Chats"

function App() {
  const routes = [
    {
      
      element: <LandingPg />,
      path: '/'
    },
    {
      element: <Chats />,
      path: '/chat'
    },
  ]  



  return (
    <main className="bg-[#F9FAFD] min-h-screen">
      <Routes>
        {routes.map((route) => (
          <Route element={route.element} path={route.path} index={route.path === "/" ? true : false}/>
        ))}

      </Routes>

      {/* <ReactTyped strings={["Here you can find anything"]} typeSpeed={50} /> */}
    </main>
  )
}

export default App
