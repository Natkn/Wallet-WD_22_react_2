/* eslint-disable react/prop-types */
import * as S from './BaseInput.styled'
function BaseInput({ error, type, name, id, placeholder, value, onChange, autoComplete, $isValid, $isInvalid }) {
    return (
       <S.Container style={{ backgroundColor: '#fff' }}>
            <S.Input 
                className={error ? 'error' : ''} 
                style={error ? { borderColor: 'red' } : {}}
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
            {error && <span style={{ color: 'red', fontSize: '12px' }}>{error}</span>}
        </S.Container>
    )
}

function BaseButton({ id, text, onClick }) {
    return (
        <>
            <S.Button type='button' id={id} onClick={onClick}>
                {text}
            </S.Button>
        </>
    )
}

export { BaseInput, BaseButton }