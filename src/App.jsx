import Header from '../src/components/header/Header'
import MainPage from './components/main/mainPage'
import AuthForm from './components/login/AuthForm'
import { GlobalStyles } from '../src/assests/GlobalStyles'

function App() {
    return (
        <>
            <GlobalStyles />
            <Header />
            <AuthForm />
            <MainPage />
        </>
    )
}

export default App
