import { Routes, Route } from 'react-router-dom';
import MainPage from './components/main/mainPage';
import Analysispage from './components/analysisPage/AnalysisPage';
import AuthForm from './components/login/AuthForm';

function NotFoundPage() {
    return <h1>404 - Страница не найдена</h1>;
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/signin" element={<AuthForm />} />
            <Route path="/signup" element={<AuthForm />} />

            <Route path="/main" element={<MainPage />} />
            <Route path="/my-expenses" element={<MainPage />} />
            <Route path="/expense-analysis" element={<Analysispage />} />

            <Route path="/log-out" element={<AuthForm />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;