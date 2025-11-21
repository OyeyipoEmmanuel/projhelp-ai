import { Route, Routes } from "react-router-dom"
import LandingPg from "./pages/LandingPg/LandingPg"

function App() {
  const routes = [
    {
      element: <LandingPg />,
      path: '/'
    }
  ]

  return (
    <main className="bg-[#F9FAFD] min-h-screen">
      <Routes>
        {routes.map((route) => (
          <Route element={route.element} path={route.path} />
        ))}

      </Routes>
    </main>
  )
}

export default App
