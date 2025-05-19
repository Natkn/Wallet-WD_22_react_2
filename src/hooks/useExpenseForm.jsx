import { useState } from 'react'
import { isValidDateFormat, isValidAmountFormat } from '../utils/helper'

export const useExpenseForm = (expenses, setExpenses) => {
    const [newDescription, setNewDescription] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newDate, setNewDate] = useState('')
    const [newAmount, setNewAmount] = useState('')
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
  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setNewDescription(expense.description);
    setNewCategory(expense.category);
    setNewDate(expense.date);
    setNewAmount(expense.amount.replace(' ₽', ''));
    setEditMode(true);
    setEditingId(expense._id); 
    setErrors({ description: false, category: false, date: false, amount: false });
  };

  const prepareTransactionData = () => ({
    
    description: newDescription,
    category: CATEGORY_MAPPING[newCategory],
    date: newDate.split('.').reverse().join('-'),
    sum: parseFloat(newAmount.replace(/\s/g, ''))
    
  });

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

