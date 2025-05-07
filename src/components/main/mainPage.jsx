import { useState } from 'react';
import { filterExpenses, sortExpenses } from '../../utils/expenseUtils';
import FoodIcon from '../icons/FoodIcon';
import { useExpenses } from '../../ExpenseContext';
import MainLayout from './MainLayout';
import { useExpenseForm } from '../../hooks/useExpenseForm';
import * as S from './main.styled';

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
    Транспорт: <S.CategoryIcon src="/car (1).svg" alt="Transport icon" />,
    Жильё: <S.CategoryIcon src="/HouseIcon.svg" alt="Housing icon" />,
    Развлечения: <S.CategoryIcon src="/PlayIcon.svg" alt="Entertainment icon" />,
    Образование: <S.CategoryIcon src="/StudyIcon.svg" alt="Education icon" />,
    Другое: <S.CategoryIcon src="/OtherIcon.svg" alt="Other icon" />,
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