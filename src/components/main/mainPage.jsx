import { useState } from 'react';
import { filterExpenses, sortExpenses } from '../../utils/expenseUtils';
import FoodIcon from '../icons/FoodIcon';
import { useExpenses } from '../../ExpenseContext';
import MainLayout from './MainLayout';
import { useExpenseForm } from '../../hooks/useExpenseForm';

function MainPage() {
  const { expenses, setExpenses } = useExpenses();
  const [selectedCategory] = useState('');
  const [sortOrder] = useState('Дата');

  const {
    newDescription,
    setNewDescription,
    newCategory,
    setNewCategory,
    newDate,
    setNewDate,
    newAmount,
    setNewAmount,
    errors,
    descriptionError,
    dateError,
    amountError,
    editMode,
    editingExpenseIndex,
    handleDescriptionChange,
    handleDateChange,
    handleAmountChange,
    handleEditExpense,
    handleAddExpense,
  } = useExpenseForm(expenses, setExpenses);

  const categories = ['Еда', 'Транспорт', 'Жильё', 'Развлечения', 'Образование', 'Другое'];
  const categoryIcons = {
    Еда: <FoodIcon />,
    Транспорт: <img src="/car (1).svg" alt="Transport icon" style={{ width: '14px', height: '14px' }} />,
    Жильё: <img src="/HouseIcon.svg" alt="Housing icon" style={{ width: '14px', height: '14px' }} />,
    Развлечения: <img src="/PlayIcon.svg" alt="Entertainment icon" style={{ width: '14px', height: '14px' }} />,
    Образование: <img src="/StudyIcon.svg" alt="Education icon" style={{ width: '14px', height: '14px' }} />,
    Другое: <img src="/OtherIcon.svg" alt="Other icon" style={{ width: '14px', height: '14px' }} />,
  };

  const filteredExpenses = filterExpenses(expenses, selectedCategory);
  const sortedExpenses = sortExpenses(filteredExpenses, sortOrder);

  return (
    <MainLayout
      sortedExpenses={sortedExpenses}
      newDescription={newDescription}
      newCategory={newCategory}
      newDate={newDate}
      newAmount={newAmount}
      editMode={editMode}
      editingExpenseIndex={editingExpenseIndex}
      categories={categories}
      categoryIcons={categoryIcons}
      errors={errors}
      descriptionError={descriptionError}
      dateError={dateError}
      amountError={amountError}
      handleEditExpense={handleEditExpense}
      handleAddExpense={handleAddExpense}
      handleDescriptionChange={handleDescriptionChange}
      handleDateChange={handleDateChange}
      handleAmountChange={handleAmountChange}
      setNewDescription={setNewDescription}
      setNewCategory={setNewCategory}
      setNewDate={setNewDate}
      setNewAmount={setNewAmount}
    />
  );
}

export default MainPage;