import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import * as S from './AuthForm.styled'
import { BaseInput, BaseButton } from '../ BaseInput/BaseInput'
import { signIn, signUp } from '../../services/auth'


function AuthForm() {
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: '',
    })

    const [fieldValid, setFieldValid] = useState({
        name: false, // Было true
        login: false, // Было true
        password: false, // Было true
    });

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
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      
        // Сброс ошибки для текущего поля
        setErrors(prev => ({ ...prev, [name]: '' }));
      
        // Принудительная валидация всех полей
        validateField(name, value);
        if (formSubmitted) {
          const isNameValid = isSignUp ? validateField('name', formData.name) : true;
          const isLoginValid = validateField('login', formData.login);
          const isPasswordValid = validateField('password', formData.password);
        }
      };

      const validateField = (fieldName, value) => {
        let isValid = false;
        switch (fieldName) {
            case 'login':
                isValid = /\S+@\S+\.\S+/.test(value);
                break;
            case 'password':
                isValid = value.length >= 6;
                break;
            case 'name':
                isValid = isSignUp ? value.trim().length > 0 && !/\d/.test(value) : true;
                break;
            default:
                break;
        }
    
        // Всегда обновляем валидность поля
        setFieldValid(prev => ({ ...prev, [fieldName]: isValid }));
        
        // Ошибки только после отправки/фокуса
        if (formSubmitted || fieldTouched[fieldName]) {
            setErrors(prev => ({
                ...prev,
                [fieldName]: isValid ? '' : getErrorMessage(fieldName)
            }));
        }
        
        return isValid;
    };

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
        const hasErrors = Object.values(errors).some(error => error !== '');
        const allFieldsValid = 
          (!isSignUp || fieldValid.name) &&
          fieldValid.login &&
          fieldValid.password;
      
        // Блокировать кнопку, если есть ошибки или поля не валидны
        setIsButtonDisabled(hasErrors || !allFieldsValid);
      }, [errors, fieldValid, isSignUp]);
      
    
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true); // Активируем флаг отправки
        
        // Проверка всех полей
        const isNameValid = isSignUp ? validateField('name', formData.name) : true;
        const isLoginValid = validateField('login', formData.login);
        const isPasswordValid = validateField('password', formData.password);
        
        if (!isNameValid || !isLoginValid || !isPasswordValid) return;
        // Валидация полей
        const newErrors = {};
        if (isSignUp && !formData.name.trim()) {
            newErrors.name = 'Введите имя';
        }
        if (!formData.login.trim()) {
            newErrors.login = 'Введите логин';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Введите пароль';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Пароль менее 6 символов';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsButtonDisabled(true)
            setFormError('Пожалуйста, исправьте ошибки в форме.')
            return;
        }

        try {
            const response = isSignUp 
                ? await signUp(formData)
                : await signIn(formData);

            localStorage.setItem('userInfo', JSON.stringify({
                token: response.token,
                user: response
            }));
            setErrors({})
            setFormError('')
            setIsButtonDisabled(false)
            navigate('/my-expenses');
        } catch (error) {
            setFormError(error.message);
        }
    };

    // const isValidEmail = (email) => {
    //     return /\S+@\S+\.\S+/.test(email)
    // }
    // const textBtn= () => {
    //     return isSignUp ? 'Зарегистрироваться' : 'Войти'
    // }
    // const text= textBtn()
    

    return (
        <S.Wrapper>
            <S.ContainerSignin>
                <S.Modal>
                    <S.ModalBlock>
                        <S.ModalTtl>
                            <h2>{isSignUp ? 'Регистрация' : 'Вход'}</h2>
                        </S.ModalTtl>
                        <S.ModalFormLogin id="formLogIn" onSubmit={handleSubmit}>
                          
                            {isSignUp && (

                                <BaseInput                                  
                                    type="text"
                                    name="name"
                                    id="formname"
                                    placeholder="Имя"
                                    value={formData.name}
                                    onChange={handleChange}
                                    $isValid={fieldTouched.name && !errors.name}
                                    $isInvalid={fieldTouched.name && errors.name}
                                />
                            )}
                            <BaseInput
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
                            <BaseInput                               
                                type="password"
                                name="password"
                                id="formpassword"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                $isValid={fieldTouched.password && !errors.password}
                                $isInvalid={fieldTouched.password && errors.password}
                            />
                            
                            {errors.name && fieldTouched.name && (

                                <S.ErrorMessage>{errors.name}</S.ErrorMessage>
                            )}

                            {errors.login && fieldTouched.login && (
                                <S.ErrorMessage>{errors.login}</S.ErrorMessage>
                            )}
                            {errors.password && fieldTouched.password && (
                                <S.ErrorMessage>{errors.password}</S.ErrorMessage>
                            )}
                            {formError && (
                                <S.ErrorMessage>{formError}</S.ErrorMessage>

                            )}

                            
                            <BaseButton
                                type="submit"
                                onClick={handleSubmit}
                                text={isSignUp ? 'Зарегистрироваться' : 'Войти'}
                                id="btnEnter" 
                                disabled={isButtonDisabled}
                            />
                                
                                
                          
                            
                            <S.ModalFormGroup>
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
                            </S.ModalFormGroup>
                        </S.ModalFormLogin>
                    </S.ModalBlock>
                </S.Modal>
            </S.ContainerSignin>
        </S.Wrapper>
    )
}

export default AuthForm