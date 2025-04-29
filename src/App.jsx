import Header from './components/header/Header';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyles } from './assests/GlobalStyles';

function App() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header />
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;