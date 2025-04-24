import HeaderLogo from './HeaderLogo'
import logo from '../../../public/logo.svg'

import { HeaderBlock, HeaderContainer } from './Header.styled'

function Header() {
    return (
        <HeaderContainer>
            <HeaderBlock>
                <HeaderLogo logo={logo} />
            </HeaderBlock>
        </HeaderContainer>
    )
}

export default Header
