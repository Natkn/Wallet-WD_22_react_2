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
} from './Header.styled'
import { Link, useLocation } from 'react-router-dom'

function Header() {
    const location = useLocation()
    const showButtons = location.pathname !== '/'

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
                                <HeaderButton>Мои расходы</HeaderButton>
                            </Link>
                            <Link to="/expense-analysis">
                                <HeaderButton>Анализ расходов</HeaderButton>
                            </Link>
                        </HeaderCenter>
                        <HeaderRight>
                            <Link to="/log-out">
                                <HeaderButton>Выйти</HeaderButton>
                            </Link>
                        </HeaderRight>
                    </HeaderButtons>
                )}
            </HeaderBlock>
        </HeaderContainer>
    )
}

export default Header
