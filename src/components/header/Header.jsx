import HeaderLogo from './HeaderLogo'
import logo from '../../../public/logo.svg'
import {
    HeaderBlock,
    HeaderContainer,
    HeaderButtons,
    HeaderButton,
    HeaderButtonOut,
} from './Header.styled'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const location = useLocation()
    const showButtons = location.pathname !== '/'

    return (
        <HeaderContainer>
            <HeaderBlock>
                <HeaderLogo logo={logo} />
                {showButtons && (
                    <HeaderButtons>
                        <Link to="/my-expenses">
                            <HeaderButton>Мои расходы</HeaderButton>
                        </Link>
                        <Link to="/expense-analysis">
                            <HeaderButton>Анализ расходов</HeaderButton>
                        </Link>
                        <Link to="/log-out">
                            <HeaderButtonOut>Выйти</HeaderButtonOut>
                        </Link>
                    </HeaderButtons>
                )}
            </HeaderBlock>
        </HeaderContainer>
    )
}

export default Header
