import HeaderLogo from './HeaderLogo'
import logo from '../../../public/logo.svg'
import {
    HeaderBlock,
    HeaderContainer,
    HeaderButtons,
    HeaderButton,
    HeaderRight,
    HeaderCenter,
    HeaderLeft,
    LogoutButton,
} from './Header.styled'
import { cleanUserData } from '../../services/auth'
import { Link, useLocation } from 'react-router-dom'

function Header() {

    const location = useLocation()   
    const excludedPaths = ['/', '/signin', '/signup']
    const userInfo = localStorage.getItem('userInfo')
    const isAuthenticated = !!userInfo
    const isMyExpensesActive = location.pathname === '/my-expenses'
    const isExpenseAnalysisActive = location.pathname === '/expense-analysis'
    const showButtons = isAuthenticated && !excludedPaths.includes(location.pathname)


    return (
        <HeaderContainer>
            <HeaderBlock>
                <HeaderLeft>
                    <HeaderLogo logo={logo} />
                </HeaderLeft>
                {showButtons && (
                    <HeaderButtons>
                        <HeaderCenter>
                            <Link to="/my-expenses">

                                <HeaderButton $active={isMyExpensesActive}>Мои расходы</HeaderButton>
                            </Link>
                            <Link to="/expense-analysis">
                                <HeaderButton $active={isExpenseAnalysisActive}>Анализ расходов</HeaderButton>

                            </Link>
                        </HeaderCenter>
                        <HeaderRight>
                            <Link to="/">
                                <LogoutButton onClick={cleanUserData}>
                                    Выйти
                                </LogoutButton>
                            </Link>
                        </HeaderRight>
                    </HeaderButtons>
                )}
            </HeaderBlock>
        </HeaderContainer>
    )
}
export default Header
