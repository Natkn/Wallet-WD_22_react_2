import { useState } from 'react';
import { isValidDateFormat, isValidAmountFormat } from '../utils/helper';

const CATEGORY_MAPPING = {
  'Еда': 'food',
  'Транспорт': 'transport',
  'Жильё': 'housing',
  'Развлечения': 'joy',
  'Образование': 'education',
  'Другое': 'others'
};
export const useExpenseForm = (expenses,  setExpenses, onSubmit) => {
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [errors, setErrors] = useState({
    description: false,
    category: false,
    date: false,
    amount: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const validateForm = () => {
    const newErrors = {
      description: !newDescription,
      category: !newCategory,
      date: !newDate || !isValidDateFormat(newDate),
      amount: !newAmount || !isValidAmountFormat(newAmount),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // const handleDescriptionChange = (e) => {
  //   const value = e.target.value;
  //   setNewDescription(value);
  //   setDescriptionError(value.length === 0);
  // };

  // const handleDateChange = (e) => {
  //   let value = e.target.value.replace(/[^0-9.]/g, '');
  //   if (value.length === 2 || value.length === 5) {
  //     if (!value.endsWith('.')) value += '.';
  //   }
  //   if (value.length > 10) value = value.slice(0, 10);
  //   setNewDate(value);
  //   setDateError(value.length > 0 && !isValidDateFormat(value));
  // };

  // const handleAmountChange = (e) => {
  //   let value = e.target.value.replace(/[^0-9\s]/g, '');
  //   const cleanedValue = value.replace(/\s/g, '');
  //   const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  //   setNewAmount(formattedValue);
  //   setAmountError(formattedValue.length > 0 && !isValidAmountFormat(formattedValue));
  // };

  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setNewDescription(expense.description);
    setNewCategory(expense.category);
    setNewDate(expense.date);
    setNewAmount(expense.amount.replace(' ₽', ''));
    setEditMode(true);
    setEditingId(expense._id); // Сохраняем ID для API
    setErrors({ description: false, category: false, date: false, amount: false });
  };

  const prepareTransactionData = () => ({
    description: newDescription,
    category: CATEGORY_MAPPING[newCategory],
    date: newDate.split('.').reverse().join('-'),
    sum: parseFloat(newAmount.replace(/\s/g, ''))
  });

  const resetForm = () => {
    setNewDescription('');
    setNewCategory('');
    setNewDate('');
    setNewAmount('');
    
    setEditingId(null);
    setErrors({ description: false, category: false, date: false, amount: false });
    
  };
  const handleAddExpense = async () => {
    if (!validateForm()) return;
    
    const transactionData = prepareTransactionData();
    try {
      await onSubmit(transactionData, editingId);
      resetForm();
      
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  return {
    newDescription,
    setNewDescription,
    newCategory,
    setNewCategory,
    newDate,
    setNewDate,
    newAmount,
    setNewAmount,
    errors,
    descriptionError: errors.description,
    dateError: errors.date,
    amountError: errors.amount,
    editMode,
    setEditMode,
    editingExpenseIndex: expenses.findIndex(e => e._id === editingId),
    handleEditExpense,
    handleAddExpense,
    handleDescriptionChange: (e) => setNewDescription(e.target.value),
    handleDateChange: (e) => {
      let value = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/(\..*)\./g, '$1');
      if (value.length === 2 || value.length === 5) {
        if (!value.endsWith('.')) value += '.';
      }
      if (value.length > 10) value = value.slice(0, 10);
      setNewDate(value);
    },
    handleAmountChange: (e) => {
      const value = e.target.value.replace(/[^0-9\s]/g, '');
      const cleanedValue = value.replace(/\s/g, '');
      const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      setNewAmount(formattedValue);
    }
  };
};