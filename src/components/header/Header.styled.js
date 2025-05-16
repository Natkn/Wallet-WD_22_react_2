import styled from 'styled-components'

export const HeaderContainer = styled.header`
    background: #ffffff;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
`

export const HeaderBlock = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    max-width: 1200px;
    padding: 20px;
    margin: 0 auto;
    box-sizing: border-box;
    gap: 22vw;

    & > * {
        flex: 0 0 auto;
    }
`
export const HeaderButtons = styled.div`
    display: flex;
`
export const HeaderLeft = styled.div`
    display: flex;
`

export const HeaderRight = styled.div`
    display: flex;
`

export const HeaderCenter = styled.div`
    display: flex;
    align-items: center;
    gap: 36px;
    margin-right: 22vw;
`

export const HeaderButton = styled.button`
    width: 128px;
    background-color: transparent;
    border: none;
    color: black;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    line-height: 170%;
    letter-spacing: 0px;
    text-align: center;

    &:hover {
        color: #1fa46c;
        border-bottom: 1px solid #1fa46c;
    }

    ${(props) =>
        props.$active &&
        `
    color: #1fa46c;
        border-bottom: 2px solid #1fa46c;
  `}
`
export const LogoutButton = styled(HeaderButton)`
    font-weight: 600;
    font-size: 14px;
    line-height: 170%;
    letter-spacing: 0px;
    text-align: center;

    &:hover {
        color: #1fa46c;
        border-bottom: none;
    }
`
