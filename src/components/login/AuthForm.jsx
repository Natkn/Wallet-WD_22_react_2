import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    Wrapper,
    ContainerSignin,
    Modal,
    ModalBlock,
    ModalTtl,
    ModalFormLogin,
    ModalInput,
    ModalBtnEnter,
    ModalFormGroup,
} from './AuthForm.styled'

function AuthForm() {
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: '',
    })

    const [fieldValid, setFieldValid] = useState({
        name: true,
        login: true,
        password: true,
    })

    const [fieldTouched, setFieldTouched] = useState({
        name: false,
        login: false,
        password: false,
    })

    const [errors, setErrors] = useState({
        name: '',
        login: '',
        password: '',
    })

    const [setError] = useState('')

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setFieldTouched((prev) => ({ ...prev, [name]: true }))
        validateField(name, value)
    }

    const validateField = (fieldName, value) => {
        let isValid = false
        let error = ''

        switch (fieldName) {
            case 'name':
                isValid = isSignUp
                    ? value.length > 0 && !/\d/.test(value)
                    : true
                error = isValid ? '' : 'Пожалуйста, введите ваше имя.'
                break
            case 'login':
                isValid = isValidEmail(value)
                error = isValid ? '' : 'Пожалуйста, введите корректный email.'
                break
            case 'password':
                isValid = value.length >= 6
                error = isValid
                    ? ''
                    : 'Пароль должен содержать не менее 6 символов.'
                break
            default:
                break
        }

        setFieldValid((prev) => ({ ...prev, [fieldName]: isValid }))
        setErrors((prev) => ({
            ...prev,
            [fieldName]: error,
        }))
        return isValid
    }

    useEffect(() => {
        const hasErrors = Object.values(errors).some((error) => error !== '')
        const allFieldsValid =
            fieldValid.login &&
            fieldValid.password &&
            (!isSignUp || fieldValid.name)

        setIsButtonDisabled(hasErrors || !allFieldsValid)
    }, [errors, fieldValid, isSignUp])

    const handleSubmit = (e) => {
        e.preventDefault()

        let newErrors = {}
        if (isSignUp && !formData.name) {
            newErrors.name = 'Пожалуйста, введите ваше имя.'
        }
        if (!formData.login) {
            newErrors.login = 'Пожалуйста, введите адрес электронной почты.'
        } else if (!isValidEmail(formData.login)) {
            newErrors.login =
                'Пожалуйста, введите корректный адрес электронной почты.'
        }
        if (!formData.password) {
            newErrors.password = 'Пожалуйста, введите пароль.'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль должен содержать не менее 6 символов.'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsButtonDisabled(true)
            setError('Пожалуйста, исправьте ошибки в форме.')
            return newErrors
        }

        setErrors({})
        setError('')
        setIsButtonDisabled(false)
        navigate('/main')
    }

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email)
    }

    return (
        <Wrapper>
            <ContainerSignin>
                <Modal>
                    <ModalBlock>
                        <ModalTtl>
                            <h2>{isSignUp ? 'Регистрация' : 'Вход'}</h2>
                        </ModalTtl>
                        <ModalFormLogin id="formLogIn" onSubmit={handleSubmit}>
                            {isSignUp && (
                                <>
                                    <ModalInput
                                        type="text"
                                        name="name"
                                        id="formname"
                                        placeholder="Имя"
                                        value={formData.name}
                                        onChange={handleChange}
                                        $isValid={
                                            fieldTouched.name && !errors.name
                                        }
                                        $isInvalid={
                                            fieldTouched.name && errors.name
                                        }
                                    />
                                </>
                            )}
                            <ModalInput
                                type="text"
                                name="login"
                                id="formlogin"
                                placeholder="Эл. почта"
                                value={formData.login}
                                onChange={handleChange}
                                autoComplete="email"
                                $isValid={fieldTouched.login && !errors.login}
                                $isInvalid={fieldTouched.login && errors.login}
                            />
                            <ModalInput
                                type="password"
                                name="password"
                                id="formpassword"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                $isValid={
                                    fieldTouched.password && !errors.password
                                }
                                $isInvalid={
                                    fieldTouched.password && errors.password
                                }
                            />
                            {errors.name && fieldTouched.name && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>
                                    {errors.name}
                                </p>
                            )}

                            {errors.login && fieldTouched.login && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>
                                    {errors.login}
                                </p>
                            )}
                            {errors.password && fieldTouched.password && (
                                <p style={{ color: 'red', fontSize: '0.8em' }}>
                                    {errors.password}
                                </p>
                            )}
                            <ModalBtnEnter
                                type="submit"
                                id="btnEnter"
                                disabled={isButtonDisabled}
                            >
                                {isSignUp ? 'Зарегистрироваться' : 'Войти'}
                            </ModalBtnEnter>
                            <ModalFormGroup>
                                {isSignUp ? (
                                    <>
                                        <p>Уже есть аккаунт?</p>
                                        <Link
                                            to="/signin"
                                            onClick={() => setIsSignUp(false)}
                                        >
                                            Войдите здесь
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p>Нужно зарегистрироваться?</p>
                                        <Link
                                            to="/signup"
                                            onClick={() => setIsSignUp(true)}
                                        >
                                            Регистрируйтесь здесь
                                        </Link>
                                    </>
                                )}
                            </ModalFormGroup>
                        </ModalFormLogin>
                    </ModalBlock>
                </Modal>
            </ContainerSignin>
        </Wrapper>
    )
}

export default AuthForm
