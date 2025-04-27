import { useState } from 'react'
import * as S from './main.styled'
import ArrowIcon from '../../../public/ArrowIcon.svg'

function MainPage() {
    const [expenses, setExpenses] = useState([
        {
            description: 'Пятерочка',
            category: 'Еда',
            date: '03.07.2024',
            amount: '3 500 ₽',
        },
    ])

    const [newDescription, setNewDescription] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newDate, setNewDate] = useState('')
    const [newAmount, setNewAmount] = useState('')

    const handleAddExpense = () => {
        const newExpense = {
            description: newDescription,
            category: newCategory,
            date: newDate,
            amount: newAmount,
        }

        setExpenses([...expenses, newExpense])

        setNewDescription('')
        setNewCategory('')
        setNewDate('')
        setNewAmount('')
    }

    return (
        <S.MainBlock>
            <S.H2>Мои расходы</S.H2>
            <S.ContentContainer>
                <S.ExpensesTableContainer>
                    <S.TableHeader>
                        <S.H3>Таблица расходов</S.H3>
                        <S.FiltersContainer>
                            <div>
                                Фильтровать по категории{' '}
                                <img
                                    src={ArrowIcon}
                                    alt="Arrow Icon"
                                    style={{
                                        marginLeft: '8px',
                                        height: '7px',
                                    }}
                                />
                            </div>
                            <div>
                                Сортировать по дате
                                <img
                                    src={ArrowIcon}
                                    alt="Arrow Icon"
                                    style={{
                                        marginLeft: '8px',
                                        height: '7px',
                                    }}
                                />
                            </div>
                        </S.FiltersContainer>
                    </S.TableHeader>
                    <S.Table>
                        <S.TableHead>
                            <S.TableRow>
                                <S.TableHeaderCell>Описание</S.TableHeaderCell>
                                <S.TableHeaderCell>Категория</S.TableHeaderCell>
                                <S.TableHeaderCell>Дата</S.TableHeaderCell>
                                <S.TableHeaderCell>Сумма</S.TableHeaderCell>
                                <S.TableHeaderCell></S.TableHeaderCell>
                            </S.TableRow>
                        </S.TableHead>
                        <tbody>
                            {expenses.map((expense, index) => (
                                <S.TableRow key={index}>
                                    <S.TableCell>
                                        {expense.description}
                                    </S.TableCell>
                                    <S.TableCell>
                                        {expense.category}
                                    </S.TableCell>
                                    <S.TableCell>{expense.date}</S.TableCell>
                                    <S.TableCell>{expense.amount}</S.TableCell>
                                    <S.TableCell>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.5 11.5H1.5C1.295 11.5 1.125 11.33 1.125 11.125C1.125 10.92 1.295 10.75 1.5 10.75H10.5C10.705 10.75 10.875 10.92 10.875 11.125C10.875 11.33 10.705 11.5 10.5 11.5Z"
                                                fill="#999999"
                                            />
                                            <path
                                                d="M9.50998 2.24008C8.53998 1.27008 7.58998 1.24508 6.59498 2.24008L5.98998 2.84508C5.93998 2.89508 5.91998 2.97508 5.93998 3.04508C6.31998 4.37008 7.37998 5.43008 8.70498 5.81008C8.72498 5.81508 8.74498 5.82008 8.76498 5.82008C8.81998 5.82008 8.86998 5.80008 8.90998 5.76008L9.50998 5.15508C10.005 4.66508 10.245 4.19008 10.245 3.71008C10.25 3.21508 10.01 2.73508 9.50998 2.24008Z"
                                                fill="#999999"
                                            />
                                            <path
                                                d="M7.80498 6.2649C7.65998 6.1949 7.51998 6.1249 7.38498 6.0449C7.27498 5.9799 7.16998 5.9099 7.06498 5.8349C6.97998 5.7799 6.87998 5.6999 6.78498 5.6199C6.77498 5.6149 6.73998 5.5849 6.69998 5.5449C6.53498 5.4049 6.34998 5.2249 6.18498 5.0249C6.16998 5.0149 6.14498 4.9799 6.10998 4.9349C6.05998 4.8749 5.97498 4.7749 5.89998 4.6599C5.83998 4.5849 5.76998 4.4749 5.70498 4.3649C5.62498 4.2299 5.55498 4.0949 5.48498 3.9549C5.3932 3.75823 5.13507 3.69981 4.98161 3.85327L2.16998 6.6649C2.10498 6.7299 2.04498 6.8549 2.02998 6.9399L1.75998 8.8549C1.70998 9.1949 1.80498 9.5149 2.01498 9.7299C2.19498 9.9049 2.44498 9.9999 2.71498 9.9999C2.77498 9.9999 2.83498 9.9949 2.89498 9.9849L4.81498 9.7149C4.90498 9.6999 5.02998 9.6399 5.08998 9.5749L7.90624 6.75863C8.05664 6.60824 8.00013 6.34947 7.80498 6.2649Z"
                                                fill="#999999"
                                            />
                                        </svg>
                                    </S.TableCell>
                                    <S.TableCell>
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.62 3.29003H9.42L7.73 1.60003C7.595 1.46503 7.375 1.46503 7.235 1.60003C7.1 1.73503 7.1 1.95503 7.235 2.09503L8.43 3.29003H3.57L4.765 2.09503C4.9 1.96003 4.9 1.74003 4.765 1.60003C4.63 1.46503 4.41 1.46503 4.27 1.60003L2.585 3.29003H2.385C1.935 3.29003 1 3.29003 1 4.57003C1 5.05503 1.1 5.37503 1.31 5.58503C1.43 5.71003 1.575 5.77503 1.73 5.81003C1.875 5.84503 2.03 5.85003 2.18 5.85003H9.82C9.975 5.85003 10.12 5.84003 10.26 5.81003C10.68 5.71003 11 5.41003 11 4.57003C11 3.29003 10.065 3.29003 9.62 3.29003Z"
                                                fill="#999999"
                                            />
                                            <path
                                                d="M9.52502 6.5H2.43502C2.12502 6.5 1.89002 6.775 1.94002 7.08L2.36002 9.65C2.50002 10.51 2.87502 11.5 4.54002 11.5H7.34502C9.03002 11.5 9.33002 10.655 9.51002 9.71L10.015 7.095C10.075 6.785 9.84002 6.5 9.52502 6.5ZM5.30502 9.725C5.30502 9.92 5.15002 10.075 4.96002 10.075C4.76502 10.075 4.61002 9.92 4.61002 9.725V8.075C4.61002 7.885 4.76502 7.725 4.96002 7.725C5.15002 7.725 5.30502 7.885 5.30502 8.075V9.725ZM7.44502 9.725C7.44502 9.92 7.29002 10.075 7.09502 10.075C6.90502 10.075 6.74502 9.92 6.74502 9.725V8.075C6.74502 7.885 6.90502 7.725 7.09502 7.725C7.29002 7.725 7.44502 7.885 7.44502 8.075V9.725Z"
                                                fill="#999999"
                                            />
                                        </svg>
                                    </S.TableCell>
                                </S.TableRow>
                            ))}
                        </tbody>
                    </S.Table>
                </S.ExpensesTableContainer>
                <S.NewExpenseContainer>
                    <S.NewExpenseTitle>Новый расход</S.NewExpenseTitle>

                    <S.InputLabel htmlFor="description">Описание:</S.InputLabel>
                    <S.InputField
                        type="text"
                        id="description"
                        placeholder="Введите описание"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />

                    <S.InputLabel>Категория:</S.InputLabel>
                    <S.CategoryButtonsContainer>
                        <S.CategoryButton onClick={() => setNewCategory('Еда')}>
                            Еда
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Транспорт')}
                        >
                            Транспорт
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Жилье')}
                        >
                            Жилье
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Развлечения')}
                        >
                            Развлечения
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Образование')}
                        >
                            Образование
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Другое')}
                        >
                            Другое
                        </S.CategoryButton>
                    </S.CategoryButtonsContainer>

                    <S.InputLabel htmlFor="date">Дата:</S.InputLabel>
                    <S.InputField
                        type="date"
                        id="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />

                    <S.InputLabel htmlFor="amount">Сумма:</S.InputLabel>
                    <S.InputField
                        type="number"
                        id="amount"
                        placeholder="Введите сумму"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                    />

                    <S.AddExpenseButton onClick={handleAddExpense}>
                        Добавить новый расход
                    </S.AddExpenseButton>
                </S.NewExpenseContainer>
            </S.ContentContainer>
        </S.MainBlock>
    )
}

export default MainPage
