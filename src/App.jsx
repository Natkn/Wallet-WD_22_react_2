import Header from '../src/components/header/Header'
import MainPage from './components/main/mainPage'
import Analysispage from './components/analysisPage/AnalysisPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthForm from './components/login/AuthForm'

import { GlobalStyles } from '../src/assests/GlobalStyles'

function App() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header />
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/expense-analysis" element={<Analysispage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
