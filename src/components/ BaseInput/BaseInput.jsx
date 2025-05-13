/* eslint-disable react/prop-types */
import * as S from './BaseInput.styled'
function BaseInput({type, name, id, placeholder, value, onChange, autoComplete, $isValid, $isInvalid }) {

        <S.Container style={{ backgroundColor: '#fff' }}>

            <S.Input 
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                id={id}
                autoComplete={autoComplete}
                $isValid={$isValid}
                $isInvalid={$isInvalid}
            />
            

        </S.Container>

    )

}

function BaseButton({ id, text, onClick, disabled }) {
    return (
        <>
            <S.Button type='button' id={id} onClick={onClick} disabled={disabled}>
                {text}
            </S.Button>
        </>
    )
}

export { BaseInput, BaseButton }