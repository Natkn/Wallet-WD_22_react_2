import { useState } from 'react';
import * as S from './main.styled';

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
    ]);

    const [newDescription, setNewDescription] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newAmount, setNewAmount] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('Дата');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

    const [errors, setErrors] = useState({
        description: false,
        category: false,
        date: false,
        amount: false,
    });

    // Состояния для немедленной валидации при вводе
    const [descriptionError, setDescriptionError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [amountError, setAmountError] = useState(false);

    const categories = ['Еда', 'Транспорт', 'Жильё', 'Развлечения', 'Образование', 'Другое'];
    const sortOptions = ['Дата', 'Сумма'];

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
    };

    // Обработка изменения описания
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setNewDescription(value);
        setDescriptionError(value.length === 0);
    };

    // Функция для форматирования и валидации даты
    const handleDateChange = (e) => {
        let value = e.target.value;

        // Удаляем всё, кроме цифр и точек
        value = value.replace(/[^0-9.]/g, '');

        // Автоматическое добавление точек
        if (value.length === 2 || value.length === 5) {
            if (!value.endsWith('.')) {
                value += '.';
            }
        }

        // Ограничиваем длину ввода (дд.мм.гггг = 10 символов)
        if (value.length > 10) {
            value = value.slice(0, 10);
        }

        setNewDate(value);

        // Проверяем валидность даты сразу
        if (value.length === 10) {
            setDateError(!isValidDateFormat(value));
        } else {
            setDateError(value.length > 0); // Если поле не пустое, но дата не полная, показываем ошибку
        }
    };

    const isValidDateFormat = (date) => {
        const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!dateRegex.test(date)) return false;

        const [day, month, year] = date.split('.').map(Number);
        const isValidDay = day >= 1 && day <= 31;
        const isValidMonth = month >= 1 && month <= 12;
        const isValidYear = year >= 1900 && year <= 2100;

        const isRealDate = () => {
            const parsedDate = new Date(year, month - 1, day);
            return (
                parsedDate.getDate() === day &&
                parsedDate.getMonth() + 1 === month &&
                parsedDate.getFullYear() === year
            );
        };

        return isValidDay && isValidMonth && isValidYear && isRealDate();
    };

    // Проверка формата суммы
    const isValidAmountFormat = (amount) => {
        // Удаляем пробелы для проверки
        const cleanedAmount = amount.replace(/\s/g, '');
        // Проверяем, что это только цифры
        const amountRegex = /^\d+$/;
        return amountRegex.test(cleanedAmount);
    };

    // Обработка изменения суммы
    const handleAmountChange = (e) => {
        let value = e.target.value;

        // Удаляем всё, кроме цифр и пробелов
        value = value.replace(/[^0-9\s]/g, '');

        // Форматируем с пробелами каждые 3 цифры
        const cleanedValue = value.replace(/\s/g, '');
        const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        setNewAmount(formattedValue);

        // Проверяем валидность суммы сразу
        setAmountError(formattedValue.length > 0 && !isValidAmountFormat(formattedValue));
    };

    const handleAddExpense = () => {
        const newErrors = {
            description: !newDescription,
            category: !newCategory,
            date: !newDate || !isValidDateFormat(newDate),
            amount: !newAmount || !isValidAmountFormat(newAmount),
        };

        setErrors(newErrors);
        setDescriptionError(newErrors.description);
        setDateError(newErrors.date);
        setAmountError(newErrors.amount);

        if (newErrors.description || newErrors.category || newErrors.date || newErrors.amount) {
            return;
        }

        const newExpense = {
            description: newDescription,
            category: newCategory,
            date: newDate,
            amount: `${newAmount} ₽`,
        };

        setExpenses([...expenses, newExpense]);

        setNewDescription('');
        setNewCategory('');
        setNewDate('');
        setNewAmount('');
        setErrors({ description: false, category: false, date: false, amount: false });
        setDescriptionError(false);
        setDateError(false);
        setAmountError(false);
    };

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
        setIsSortDropdownOpen(false);
    };

    const toggleSortDropdown = () => {
        setIsSortDropdownOpen(!isSortDropdownOpen);
        setIsCategoryDropdownOpen(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsCategoryDropdownOpen(false);
    };

    const handleSortSelect = (order) => {
        setSortOrder(order);
        setIsSortDropdownOpen(false);
    };

    const filteredExpenses = selectedCategory
        ? expenses.filter((expense) => expense.category === selectedCategory)
        : expenses;

    const sortedExpenses = [...filteredExpenses].sort((a, b) => {
        if (sortOrder === 'Дата') {
            const dateA = new Date(a.date.split('.').reverse().join('-'));
            const dateB = new Date(b.date.split('.').reverse().join('-'));
            return dateB - dateA;
        } else {
            const amountA = parseFloat(a.amount.replace(' ₽', '').replace(' ', ''));
            const amountB = parseFloat(b.amount.replace(' ₽', '').replace(' ', ''));
            return amountB - amountA;
        }
    });

    return (
        <S.MainBlock>
            <S.H2>Мои расходы</S.H2>
            <S.ContentContainer>
                <S.ExpensesTableContainer>
                    <S.TableHeader>
                        <S.H3>Таблица расходов</S.H3>
                        <S.FiltersContainer style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                            <S.FilterWrapper>
                                <S.FilterButton onClick={toggleCategoryDropdown}>
                                    Фильтровать по категории <S.GreenLink>{selectedCategory || 'выбрать'}</S.GreenLink>
                                    <img
                                        src="/ArrowIcon.svg"
                                        alt="Arrow Icon"
                                        style={{
                                            marginLeft: '8px',
                                            height: '7px',
                                            transform: isCategoryDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                </S.FilterButton>
                                {isCategoryDropdownOpen && (
                                    <S.DropdownMenu>
                                        {categories.map((category) => (
                                            <S.DropdownItem
                                                key={category}
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                {categoryIcons[category] && (
                                                    typeof categoryIcons[category] === 'string' ? (
                                                        <img
                                                            src={categoryIcons[category]}
                                                            alt={`${category} icon`}
                                                            style={{ width: '14px', height: '14px' }}
                                                        />
                                                    ) : (
                                                        categoryIcons[category]
                                                    )
                                                )}
                                                {category}
                                            </S.DropdownItem>
                                        ))}
                                    </S.DropdownMenu>
                                )}
                            </S.FilterWrapper>
                            <S.FilterWrapper>
                                <S.FilterButton onClick={toggleSortDropdown}>
                                    Сортировать по <S.GreenLink>{sortOrder.toLowerCase()}</S.GreenLink>
                                    <img
                                        src="/ArrowIcon.svg"
                                        alt="Arrow Icon"
                                        style={{
                                            marginLeft: '8px',
                                            height: '7px',
                                            transform: isSortDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                </S.FilterButton>
                                {isSortDropdownOpen && (
                                    <S.DropdownMenu>
                                        {sortOptions.map((option) => (
                                            <S.DropdownItem
                                                key={option}
                                                onClick={() => handleSortSelect(option)}
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
                                <S.TableRow key={index}>
                                    <S.TableCell>{expense.description}</S.TableCell>
                                    <S.TableCell>{expense.category}</S.TableCell>
                                    <S.TableCell>{expense.date}</S.TableCell>
                                    <S.TableCell>{expense.amount}</S.TableCell>
                                    <S.TableCell>
                                        <button
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                padding: 0,
                                                cursor: 'pointer',
                                            }}
                                        >
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
                                        </button>
                                    </S.TableCell>
                                    <S.TableCell>
                                        <button
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                                padding: 0,
                                                cursor: 'pointer',
                                            }}
                                        >
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
                                        </button>
                                    </S.TableCell>
                                </S.TableRow>
                            ))}
                        </tbody>
                    </S.Table>
                </S.ExpensesTableContainer>
                <S.NewExpenseContainer>
                    <S.NewExpenseTitle>Новый расход</S.NewExpenseTitle>

                    <S.InputLabel htmlFor="description">
                        Описание:{(errors.description || descriptionError)}
                    </S.InputLabel>
                    <S.InputField
                        type="text"
                        id="description"
                        placeholder="Введите описание"
                        value={newDescription}
                        onChange={handleDescriptionChange}
                        style={{
                            borderColor: descriptionError || errors.description ? 'red' : '#E0E0E0',
                            backgroundColor: descriptionError || errors.description ? '#FFF5F5' : newDescription ? '#E7F6F2' : '#FFFFFF',
                        }}
                    />

                    <S.InputLabel>
                        Категория:{errors.category && <span style={{ color: 'red' }}> *</span>}
                    </S.InputLabel>
                    <S.CategoryButtonsContainer>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Еда')}
                            style={{
                                backgroundColor: newCategory === 'Еда' ? '#E7F6F2' : 'transparent',
                            }}
                        >
                            {categoryIcons['Еда']}
                            Еда
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Транспорт')}
                            style={{
                                backgroundColor: newCategory === 'Транспорт' ? '#E7F6F2' : 'transparent',
                            }}
                        >
                            <img src="/car (1).svg" alt="Transport icon" style={{ width: '14px', height: '14px' }} />
                            Транспорт
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Жильё')}
                            style={{
                                backgroundColor: newCategory === 'Жильё' ? '#E7F6F2' : 'transparent',
                            }}
                        >
                            <img src="/HouseIcon.svg" alt="Housing icon" style={{ width: '14px', height: '14px' }} />
                            Жильё
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Развлечения')}
                            style={{
                                backgroundColor: newCategory === 'Развлечения' ? '#E7F6F2' : 'transparent',
                            }}
                        >
                            <img src="/PlayIcon.svg" alt="Entertainment icon" style={{ width: '14px', height: '14px' }} />
                            Развлечения
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Образование')}
                            style={{
                                backgroundColor: newCategory === 'Образование' ? '#E7F6F2' : 'transparent',
                            }}
                        >
                            <img src="/StudyIcon.svg" alt="Education icon" style={{ width: '14px', height: '14px' }} />
                            Образование
                        </S.CategoryButton>
                        <S.CategoryButton
                            onClick={() => setNewCategory('Другое')}
                            style={{
                                backgroundColor: newCategory === 'Другое' ? '#E7F6F2' : 'transparent',
                            }}
                        >
                            <img src="/OtherIcon.svg" alt="Other icon" style={{ width: '14px', height: '14px' }} />
                            Другое
                        </S.CategoryButton>
                    </S.CategoryButtonsContainer>

                    <S.InputLabel htmlFor="date">
                        Дата:{(errors.date || dateError) && <span style={{ color: 'red' }}> *</span>}
                    </S.InputLabel>
                    <S.InputField
                        id="date"
                        placeholder="дд.мм.гггг"
                        value={newDate}
                        onChange={handleDateChange}
                        style={{
                            borderColor: dateError || errors.date ? 'red' : '#E0E0E0',
                            backgroundColor: dateError || errors.date ? '#FFF5F5' : isValidDateFormat(newDate) ? '#E7F6F2' : '#FFFFFF',
                        }}
                    />

                    <S.InputLabel htmlFor="amount">
                        Сумма:{(errors.amount || amountError) && <span style={{ color: 'red' }}> *</span>}
                    </S.InputLabel>
                    <S.InputField
                        id="amount"
                        placeholder="Введите сумму"
                        value={newAmount}
                        onChange={handleAmountChange}
                        style={{
                            borderColor: amountError || errors.amount ? 'red' : '#E0E0E0',
                            backgroundColor: amountError || errors.amount ? '#FFF5F5' : isValidAmountFormat(newAmount) ? '#E7F6F2' : '#FFFFFF',
                        }}
                    />

                    <S.AddExpenseButton
                        onClick={handleAddExpense}
                        style={{
                            backgroundColor: '#00A575',
                            cursor: 'pointer',
                        }}
                    >
                        Добавить новый расход
                    </S.AddExpenseButton>
                </S.NewExpenseContainer>
            </S.ContentContainer>
        </S.MainBlock>
    );
}

export default MainPage;