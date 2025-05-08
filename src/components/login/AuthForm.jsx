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
    ErrorMessage,
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

    const [formError, setFormError] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setFieldTouched((prev) => ({ ...prev, [name]: true }))
        validateField(name, value)
    }

    const validateField = (fieldName, value) => {
        let isValid = false
        switch (fieldName) {
            case 'name':
                isValid = isSignUp
                    ? value.length > 0 && !/\d/.test(value)
                    : true
                break
            case 'login':
                isValid = isValidEmail(value)
                break
            case 'password':
                isValid = value.length >= 6
                break
            default:
                break
        }
        setFieldValid((prev) => ({ ...prev, [fieldName]: isValid }))
        setErrors((prev) => ({
            ...prev,
            [fieldName]: isValid ? '' : getErrorMessage(fieldName),
        }))
        return isValid
    }

    const getErrorMessage = (fieldName) => {
        switch (fieldName) {
            case 'name':
                return 'Пожалуйста, введите ваше имя.'
            case 'login':
                return 'Пожалуйста, введите корректный email.'
            case 'password':
                return 'Пароль должен содержать не менее 6 символов.'
            default:
                return ''
        }
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
        navigate('/main')

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
            setFormError('Пожалуйста, исправьте ошибки в форме.')
            return
        }

        setErrors({})
        setFormError('')
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
                                <ErrorMessage>{errors.name}</ErrorMessage>
                            )}

                            {errors.login && fieldTouched.login && (
                                <ErrorMessage>{errors.login}</ErrorMessage>
                            )}
                            {errors.password && fieldTouched.password && (
                                <ErrorMessage>{errors.password}</ErrorMessage>
                            )}
                            {formError && (
                                <ErrorMessage>{formError}</ErrorMessage>
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