import { Route, Routes } from "react-router-dom"
import Main from "./pages/Main.tsx"
import Final from "./pages/Final.tsx"

const App = () => {
    return (
        <Routes>
            {/* Add routes here */}
            <Route path="/" element={<Main />} />
            <Route path="/final" element={<Final />} />
        </Routes>
    )
}

export default App