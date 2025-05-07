import { useState }  from 'react';
import * as S from './main.styled';
import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import { isValidDateFormat, isValidAmountFormat } from '../../utils/helper';
import { filterExpenses, sortExpenses } from '../../utils/expenseUtils';
import FoodIcon from '../icons/FoodIcon';
import { useExpenses } from '../../ExpenseContext';

function MainPage() {
  const { expenses, setExpenses } = useExpenses();
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [selectedCategory] = useState('');
  const [sortOrder] = useState('Дата');
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({
    description: false,
    category: false,
    date: false,
    amount: false,
  });
  const [descriptionError, setDescriptionError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingExpenseIndex, setEditingExpenseIndex] = useState(null);

  const categories = ['Еда', 'Транспорт', 'Жильё', 'Развлечения', 'Образование', 'Другое'];
//   const sortOptions = ['Дата', 'Сумма'];
  const categoryIcons = {
    Еда: <FoodIcon />,
    Транспорт: <img src="/car (1).svg" alt="Transport icon" style={{ width: '14px', height: '14px' }} />,
    Жильё: <img src="/HouseIcon.svg" alt="Housing icon" style={{ width: '14px', height: '14px' }} />,
    Развлечения: <img src="/PlayIcon.svg" alt="Entertainment icon" style={{ width: '14px', height: '14px' }} />,
    Образование: <img src="/StudyIcon.svg" alt="Education icon" style={{ width: '14px', height: '14px' }} />,
    Другое: <img src="/OtherIcon.svg" alt="Other icon" style={{ width: '14px', height: '14px' }} />,
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setNewDescription(value);
    setDescriptionError(value.length === 0);
  };

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, '');
    if (value.length === 2 || value.length === 5) {
      if (!value.endsWith('.')) value += '.';
    }
    if (value.length > 10) value = value.slice(0, 10);
    setNewDate(value);
    setDateError(value.length > 0 && !isValidDateFormat(value));
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9\s]/g, '');
    const cleanedValue = value.replace(/\s/g, '');
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    setNewAmount(formattedValue);
    setAmountError(formattedValue.length > 0 && !isValidAmountFormat(formattedValue));
  };

  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setNewDescription(expense.description);
    setNewCategory(expense.category);
    setNewDate(expense.date);
    setNewAmount(expense.amount.replace(' ₽', ''));
    setEditMode(true);
    setEditingExpenseIndex(index);
    setErrors({ description: false, category: false, date: false, amount: false });
    setDescriptionError(false);
    setDateError(false);
    setAmountError(false);
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

    if (Object.values(newErrors).some(Boolean)) return;

    if (editMode) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editingExpenseIndex] = {
        description: newDescription,
        category: newCategory,
        date: newDate,
        amount: `${newAmount} ₽`,
      };
      setExpenses(updatedExpenses);
      setEditMode(false);
      setEditingExpenseIndex(null);
    } else {
      setExpenses([...expenses, { description: newDescription, category: newCategory, date: newDate, amount: `${newAmount} ₽` }]);
    }

    setNewDescription('');
    setNewCategory('');
    setNewDate('');
    setNewAmount('');
    setErrors({ description: false, category: false, date: false, amount: false });
    setDescriptionError(false);
    setDateError(false);
    setAmountError(false);
  };

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
//     setIsSortDropdownOpen(false);
//   };

//   const toggleSortDropdown = () => {
//     setIsSortDropdownOpen(!isSortDropdownOpen);
//     setIsCategoryDropdownOpen(false);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setIsCategoryDropdownOpen(false);
//   };

//   const handleSortSelect = (order) => {
//     setSortOrder(order);
//     setIsSortDropdownOpen(false);
//   };

  const filteredExpenses = filterExpenses(expenses, selectedCategory);
  const sortedExpenses = sortExpenses(filteredExpenses, sortOrder);

  return (
    <S.MainBlock>
      <S.H2>Мои расходы</S.H2>
      <S.ContentContainer>
        <ExpensesTable
          expenses={sortedExpenses}
          onEdit={handleEditExpense}
          editMode={editMode}
          editingExpenseIndex={editingExpenseIndex}
        />
        <ExpenseForm
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          newDate={newDate}
          setNewDate={setNewDate}
          newAmount={newAmount}
          setNewAmount={setNewAmount}
          handleAddExpense={handleAddExpense}
          editMode={editMode}
          categories={categories}
          categoryIcons={categoryIcons}
          errors={errors}
          descriptionError={descriptionError}
          dateError={dateError}
          amountError={amountError}
          handleDescriptionChange={handleDescriptionChange}
          handleDateChange={handleDateChange}
          handleAmountChange={handleAmountChange}
        />
      </S.ContentContainer>
    </S.MainBlock>
  );
}

export default MainPage;