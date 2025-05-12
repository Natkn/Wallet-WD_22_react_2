
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
`

export const Input = styled.input`
    width: 100%;
    padding: 8px 30px 8px 10px; 
    border: 0.5px solid;
    border-color: ${({ $isInvalid, $isValid }) => 
        $isInvalid ? '#F84D4D' : 
        $isValid ? '#1FA46C' : '#C4C4C4'};
    background-color: ${({ $isInvalid, $isValid }) => 
        $isInvalid ? '#FFEBEB' : 
        $isValid ? '#DBFFE9' : 'transparent'};
    border-radius: 8px;
    font-size: 14px;
    outline: none;

    &:focus {
        border-color: ${({ $isInvalid }) => ($isInvalid ? '#F84D4D' : '#3b82f6')};
        box-shadow: ${({ $isInvalid }) => ($isInvalid ? '0 0 4px #F84D4D' : '0 0 4px #3b82f6')};
    }
`;

export const Button = styled.button`
     padding: 10px 20px;
    height: 39px;
    color: #fff;
  border:none;
    border-radius: 4px;
    margin-top: 16px;
    margin-bottom: 14px;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    text-align: center;
    vertical-align: middle;
    background-color: #1fa46c;

    &:hover {
        background-color: #16784f;
    }

    &:disabled {
        background-color: #999999;
        cursor: not-allowed;
    }
    &::placeholder {
        &::after {
            content: ' *';
            color: #F84D4D;
    }
  }
`

export const Text = styled.p`
    text-align: center;
    font-size: 14px;
    color: #6b7280;
    margin-top: 12px;
`
