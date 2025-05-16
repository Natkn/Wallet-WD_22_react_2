import { useState } from 'react'
import * as S from './main.styled'
import PropTypes from 'prop-types'

function MainPage() {
    const [expenses, setExpenses] = useState([
        {
            description: 'Пятёрочка',
            category: 'Еда',
            date: '03.07.2024',
            amount: '3 500 ₽',
        },
        {
            description: 'Метро',
            category: 'Транспорт',
            date: '02.07.2024',
            amount: '200 ₽',
        },
        {
            description: 'Квартплата',
            category: 'Жильё',
            date: '01.07.2024',
            amount: '5 000 ₽',
        },
    ])
    const [newDescription, setNewDescription] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newDate, setNewDate] = useState('')
    const [newAmount, setNewAmount] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortOrder, setSortOrder] = useState('Дата')
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
    const [errors, setErrors] = useState({
        description: false,
        category: false,
        date: false,
        amount: false,
    })

    const [descriptionError, setDescriptionError] = useState(false)
    const [dateError, setDateError] = useState(false)
    const [amountError, setAmountError] = useState(false)

    const [editMode, setEditMode] = useState(false)
    const [editingExpenseIndex, setEditingExpenseIndex] = useState(null)

    const categories = [
        'Еда',
        'Транспорт',
        'Жильё',
        'Развлечения',
        'Образование',
        'Другое',
    ]
    const sortOptions = ['Дата', 'Сумма']

    const categoryIcons = {
        Еда: (
            <svg
                width="14"
                height="14"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M9.62 3.29003H9.42L7.73 1.60003C7.595 1.46503 7.375 1.46503 7.235 1.60003C7.1 1.73503 7.1 1.95503 7.235 2.09503L8.43 3.29003H3.57L4.765 2.09503C4.9 1.96003 4.9 1.74003 4.765 1.60003C4.63 1.46503 4.41 1.46503 4.27 1.60003L2.585 3.29003H2.385C1.935 3.29003 1 3.29003 1 4.57003C1 5.05503 1.1 5.37503 1.31 5.58503C1.43 5.71003 1.575 5.77503 1.73 5.81003C1.875 5.84503 2.03 5.85003 2.18 5.85003H9.82C9.975 5.85003 10.12 5.84003 10.26 5.81003C10.68 5.71003 11 5.41003 11 4.57003C11 3.29003 10.065 3.29003 9.62 3.29003Z"
                    fill="#000000"
                />
                <path
                    d="M9.52502 6.5H2.43502C2.12502 6.5 1.89002 6.775 1.94002 7.08L2.36002 9.65C2.50002 10.51 2.87502 11.5 4.54002 11.5H7.34502C9.03002 11.5 9.33002 10.655 9.51002 9.71L10.015 7.095C10.075 6.785 9.84002 6.5 9.52502 6.5ZM5.30502 9.725C5.30502 9.92 5.15002 10.075 4.96002 10.075C4.76502 10.075 4.61002 9.92 4.61002 9.725V8.075C4.61002 7.885 4.76502 7.725 4.96002 7.725C5.15002 7.725 5.30502 7.885 5.30502 8.075V9.725ZM7.44502 9.725C7.44502 9.92 7.29002 10.075 7.09502 10.075C6.90502 10.075 6.74502 9.92 6.74502 9.725V8.075C6.74502 7.885 6.90502 7.725 7.09502 7.725C7.29002 7.725 7.44502 7.885 7.44502 8.075V9.725Z"
                    fill="#000000"
                />
            </svg>
        ),
        Транспорт: '/car (1).svg',
        Жильё: '/HouseIcon.svg',
        Развлечения: '/PlayIcon.svg',
        Образование: '/StudyIcon.svg',
        Другое: '/OtherIcon.svg',
    }

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setNewDescription(value)
        setDescriptionError(value.length === 0)
    }

    const handleDateChange = (e) => {
        let value = e.target.value

        value = value.replace(/[^0-9.]/g, '')

        if (value.length === 2 || value.length === 5) {
            if (!value.endsWith('.')) {
                value += '.'
            }
        }

        if (value.length > 10) {
            value = value.slice(0, 10)
        }

        setNewDate(value)

        if (value.length === 10) {
            setDateError(!isValidDateFormat(value))
        } else {
            setDateError(value.length > 0)
        }
    }

    const isValidDateFormat = (date) => {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/
        if (!dateRegex.test(date)) return false

        const [day, month, year] = date.split('.').map(Number)
        const isValidDay = day >= 1 && day <= 31
        const isValidMonth = month >= 1 && month <= 12
        const isValidYear = year >= 1900 && year <= 2100

        const isRealDate = () => {
            const parsedDate = new Date(year, month - 1, day)
            return (
                parsedDate.getDate() === day &&
                parsedDate.getMonth() + 1 === month &&
                parsedDate.getFullYear() === year
            )
        }

        return isValidDay && isValidMonth && isValidYear && isRealDate()
    }

    const isValidAmountFormat = (amount) => {
        const cleanedAmount = amount.replace(/\s/g, '')
        const amountRegex = /^\d+$/
        return amountRegex.test(cleanedAmount)
    }

    const handleAmountChange = (e) => {
        let value = e.target.value

        value = value.replace(/[^0-9\s]/g, '')

        const cleanedValue = value.replace(/\s/g, '')
        const formattedValue = cleanedValue.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        )

        setNewAmount(formattedValue)

        setAmountError(
            formattedValue.length > 0 && !isValidAmountFormat(formattedValue)
        )
    }

    const handleEditExpense = (index) => {
        const expense = expenses[index]
        setNewDescription(expense.description)
        setNewCategory(expense.category)
        setNewDate(expense.date)
        setNewAmount(expense.amount.replace(' ₽', ''))
        setEditMode(true)
        setEditingExpenseIndex(index)
        setErrors({
            description: false,
            category: false,
            date: false,
            amount: false,
        })
        setDescriptionError(false)
        setDateError(false)
        setAmountError(false)
    }

    const handleAddExpense = () => {
        const newErrors = {
            description: !newDescription,
            category: !newCategory,
            date: !newDate || !isValidDateFormat(newDate),
            amount: !newAmount || !isValidAmountFormat(newAmount),
        }

        setErrors(newErrors)
        setDescriptionError(newErrors.description)
        setDateError(newErrors.date)
        setAmountError(newErrors.amount)

        if (
            newErrors.description ||
            newErrors.category ||
            newErrors.date ||
            newErrors.amount
        ) {
            return
        }

        if (editMode) {
            const updatedExpenses = [...expenses]
            updatedExpenses[editingExpenseIndex] = {
                description: newDescription,
                category: newCategory,
                date: newDate,
                amount: `${newAmount} ₽`,
            }
            setExpenses(updatedExpenses)
            setEditMode(false)
            setEditingExpenseIndex(null)
        } else {
            const newExpense = {
                description: newDescription,
                category: newCategory,
                date: newDate,
                amount: `${newAmount} ₽`,
            }
            setExpenses([...expenses, newExpense])
        }

        setNewDescription('')
        setNewCategory('')
        setNewDate('')
        setNewAmount('')
        setErrors({
            description: false,
            category: false,
            date: false,
            amount: false,
        })
        setDescriptionError(false)
        setDateError(false)
        setAmountError(false)
    }

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
        setIsSortDropdownOpen(false)
    }

    const toggleSortDropdown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen)
        setIsCategoryDropdownOpen(false)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
        setIsCategoryDropdownOpen(false)
    }

    const handleSortSelect = (order) => {
        setSortOrder(order)
        setIsSortDropdownOpen(false)
    }

    const filteredExpenses = selectedCategory
        ? expenses.filter((expense) => expense.category === selectedCategory)
        : expenses

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (sortOrder === 'Дата') {
            const dateA = new Date(a.date.split('.').reverse().join('-'))
            const dateB = new Date(b.date.split('.').reverse().join('-'))
            return dateB - dateA
        } else {
            const amountA = parseFloat(
                a.amount.replace(' ₽', '').replace(' ', '')
            )
            const amountB = parseFloat(
                b.amount.replace(' ₽', '').replace(' ', '')
            )
            return amountB - amountA
        }
    })

    return (
        <S.MainBlock>
            <S.H2>Мои расходы</S.H2>
            <S.ContentContainer>
                <S.ExpensesTableContainer>
                    <S.TableHeader>
                        <S.H3>Таблица расходов</S.H3>
                        <S.FiltersContainer
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '10px',
                                alignItems: 'center',
                            }}
                        >
                            <S.FilterWrapper>
                                <S.FilterButton
                                    onClick={toggleCategoryDropdown}
                                >
                                    Фильтровать по категории{' '}
                                    <S.GreenLink>
                                        {selectedCategory || 'выбрать'}
                                    </S.GreenLink>
                                    <img
                                        src="/ArrowIcon.svg"
                                        alt="Arrow Icon"
                                        style={{
                                            marginLeft: '8px',
                                            height: '7px',
                                            transform: isCategoryDropdownOpen
                                                ? 'rotate(180deg)'
                                                : 'rotate(0deg)',
                                        }}
                                    />
                                </S.FilterButton>
                                {isCategoryDropdownOpen && (
                                    <S.DropdownMenu>
                                        {categories.map((category) => (
                                            <S.DropdownItem
                                                key={category}
                                                onClick={() =>
                                                    handleCategorySelect(
                                                        category
                                                    )
                                                }
                                            >
                                                {categoryIcons[category] &&
                                                    (typeof categoryIcons[
                                                        category
                                                    ] === 'string' ? (
                                                        <img
                                                            src={
                                                                categoryIcons[
                                                                    category
                                                                ]
                                                            }
                                                            alt={`${category} icon`}
                                                            style={{
                                                                width: '14px',
                                                                height: '14px',
                                                            }}
                                                        />
                                                    ) : (
                                                        categoryIcons[category]
                                                    ))}
                                                {category}
                                            </S.DropdownItem>
                                        ))}
                                    </S.DropdownMenu>
                                )}
                            </S.FilterWrapper>
                            <S.FilterWrapper>
                                <S.FilterButton onClick={toggleSortDropdown}>
                                    Сортировать по{' '}
                                    <S.GreenLink>
                                        {sortOrder.toLowerCase()}
                                    </S.GreenLink>
                                    <img
                                        src="/ArrowIcon.svg"
                                        alt="Arrow Icon"
                                        style={{
                                            marginLeft: '8px',
                                            height: '7px',
                                            transform: isSortDropdownOpen
                                                ? 'rotate(180deg)'
                                                : 'rotate(0deg)',
                                        }}
                                    />
                                </S.FilterButton>
                                {isSortDropdownOpen && (
                                    <S.DropdownMenu>
                                        {sortOptions.map((option) => (
                                            <S.DropdownItem
                                                key={option}
                                                onClick={() =>
                                                    handleSortSelect(option)
                                                }
                                            >
                                                {option}
                                            </S.DropdownItem>
                                        ))}
                                    </S.DropdownMenu>
                                )}
                            </S.FilterWrapper>
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
                            {sortedExpenses.map((expense, index) => (
                                <S.TableRow
                                    key={index}
                                    $isEditing={
                                        editMode &&
                                        editingExpenseIndex === index
                                    }
                                >
                                    <S.TableCell>
                                        {expense.description}
                                    </S.TableCell>
                                    <S.TableCell>
                                        {expense.category}
                                    </S.TableCell>
                                    <S.TableCell>{expense.date}</S.TableCell>
                                    <S.TableCell>{expense.amount}</S.TableCell>
                                    <S.TableCell>
                                        <button
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                padding: '0 8px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() =>
                                                handleEditExpense(index)
                                            }
                                        >
                                            <img
                                                src={
                                                    editMode &&
                                                    editingExpenseIndex ===
                                                        index
                                                        ? 'EditBtnGreen.svg'
                                                        : 'EditBtn.svg'
                                                }
                                                alt="Edit icon"
                                                style={{
                                                    width: '12px',
                                                    height: '12px',
                                                }}
                                            />
                                        </button>
                                    </S.TableCell>
                                    <S.TableCell>
                                        <button
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                padding: '0 8px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <img
                                                src={
                                                    editMode &&
                                                    editingExpenseIndex ===
                                                        index
                                                        ? 'DelBtnGreen.svg'
                                                        : 'DelBtn.svg'
                                                }
                                                alt="Delete icon"
                                                style={{
                                                    width: '12px',
                                                    height: '12px',
                                                }}
                                            />
                                        </button>
                                    </S.TableCell>
                                </S.TableRow>
                            ))}
                        </tbody>
                    </S.Table>
                </S.ExpensesTableContainer>
                <S.NewExpenseContainer>
                    <S.NewExpenseTitle>
                        {editMode ? 'Редактирование' : 'Новый расход'}
                    </S.NewExpenseTitle>

                    <S.InputLabel htmlFor="description">
                        Описание:
                        {(errors.description || descriptionError) && (
                            <span style={{ color: 'red' }}> *</span>
                        )}
                    </S.InputLabel>
                    <S.InputField
                        type="text"
                        id="description"
                        placeholder="Введите описание"
                        value={newDescription}
                        onChange={handleDescriptionChange}
                        style={{
                            borderColor:
                                descriptionError || errors.description
                                    ? 'red'
                                    : newDescription
                                    ? '#1FA46C'
                                    : '#999999',
                            backgroundColor:
                                descriptionError || errors.description
                                    ? '#FFF5F5'
                                    : newDescription
                                    ? '#DBFFE9'
                                    : '#FFFFFF',
                        }}
                    />

                    <S.InputLabel>
                        Категория:
                        {errors.category && (
                            <span style={{ color: 'red' }}> *</span>
                        )}
                    </S.InputLabel>
                    <S.CategoryButtonsContainer>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Еда')}
                            className={newCategory === 'Еда' ? 'selected' : ''}
                        >
                            {categoryIcons['Еда']}
                            Еда
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Транспорт')}
                            className={
                                newCategory === 'Транспорт' ? 'selected' : ''
                            }
                        >
                            <img
                                src="/car (1).svg"
                                alt="Transport icon"
                                style={{ width: '14px', height: '14px' }}
                            />
                            Транспорт
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Жильё')}
                            className={
                                newCategory === 'Жильё' ? 'selected' : ''
                            }
                        >
                            <img
                                src="/HouseIcon.svg"
                                alt="Housing icon"
                                style={{ width: '14px', height: '14px' }}
                            />
                            Жильё
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Развлечения')}
                            className={
                                newCategory === 'Развлечения' ? 'selected' : ''
                            }
                        >
                            <img
                                src="/PlayIcon.svg"
                                alt="Entertainment icon"
                                style={{ width: '14px', height: '14px' }}
                            />
                            Развлечения
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Образование')}
                            className={
                                newCategory === 'Образование' ? 'selected' : ''
                            }
                        >
                            <img
                                src="/StudyIcon.svg"
                                alt="Education icon"
                                style={{ width: '14px', height: '14px' }}
                            />
                            Образование
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Другое')}
                            className={
                                newCategory === 'Другое' ? 'selected' : ''
                            }
                        >
                            <img
                                src="/OtherIcon.svg"
                                alt="Other icon"
                                style={{ width: '14px', height: '14px' }}
                            />
                            Другое
                        </S.CategoryButton>
                    </S.CategoryButtonsContainer>

                    <S.InputLabel htmlFor="date">
                        Дата:
                        {(errors.date || dateError) && (
                            <span style={{ color: 'red' }}> *</span>
                        )}
                    </S.InputLabel>
                    <S.InputField
                        id="date"
                        placeholder="дд.мм.гггг"
                        value={newDate}
                        onChange={handleDateChange}
                        style={{
                            borderColor:
                                dateError || errors.date
                                    ? 'red'
                                    : isValidDateFormat(newDate)
                                    ? '#1FA46C'
                                    : '#999999',
                            backgroundColor:
                                dateError || errors.date
                                    ? '#FFF5F5'
                                    : isValidDateFormat(newDate)
                                    ? '#DBFFE9'
                                    : '#FFFFFF',
                        }}
                    />

                    <S.InputLabel htmlFor="amount">
                        Сумма:
                        {(errors.amount || amountError) && (
                            <span style={{ color: 'red' }}> *</span>
                        )}
                    </S.InputLabel>
                    <S.InputField
                        id="amount"
                        placeholder="Введите сумму"
                        value={newAmount}
                        onChange={handleAmountChange}
                        style={{
                            borderColor:
                                amountError || errors.amount
                                    ? 'red'
                                    : isValidAmountFormat(newAmount)
                                    ? '#1FA46C'
                                    : '#999999',
                            backgroundColor:
                                amountError || errors.amount
                                    ? '#FFF5F5'
                                    : isValidAmountFormat(newAmount)
                                    ? '#DBFFE9'
                                    : '#FFFFFF',
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            marginTop: '20px',
                        }}
                    >
                        <S.AddExpenseButton onClick={handleAddExpense}>
                            {editMode
                                ? 'Сохранить редактирование'
                                : 'Добавить новый расход'}
                        </S.AddExpenseButton>
                        {editMode}
                    </div>
                </S.NewExpenseContainer>
            </S.ContentContainer>
        </S.MainBlock>
    )
}

MainPage.propTypes = {
    isEditing: PropTypes.bool.isRequired,
}

export default MainPage
