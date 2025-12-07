import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import LoadingComponent from "./components/Loading/LoadingComponent"

const LandingPg = lazy(() => import("./pages/LandingPg/LandingPg"))

const Chats = lazy(() => import("./pages/ChatPage/Chats"))


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
      <Suspense fallback={<LoadingComponent/>}>
        <Routes>
          {routes.map((route) => (
            <Route element={route.element} path={route.path} index={route.path === "/" ? true : false} />
          ))}

        </Routes>
      </Suspense>

      {/* <ReactTyped strings={["Here you can find anything"]} typeSpeed={50} /> */}
    </main>
  )
}

export default App
