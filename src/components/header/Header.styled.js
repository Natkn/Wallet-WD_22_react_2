import styled from 'styled-components'

export const HeaderContainer = styled.header`
    background: #ffffff;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
`

export const HeaderBlock = styled.div`
    height: 70px;
    width: 64px;
    left: 110px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 10px;
    max-width: 1260px;
    flex-direction: column;
    align-content: space-between;
    gap: 21vw;
`
export const HeaderButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 36px;
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
    }
`

export const HeaderButtonOut = styled.button`
    width: 110px;
    margin-left: auto;
    background-color: transparent;
    border: none;
    color: black;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    margin-left: 24vw;

    &:hover {
        color: #1fa46c;
    }
`
