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

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setNewDescription(value)
        setDescriptionError(value.length < 4)
    }

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/[^0-9.]/g, '')
    if (value.length === 2 || value.length === 5) {
      if (!value.endsWith('.')) value += '.'
    }
    if (value.length > 10) value = value.slice(0, 10)
    setNewDate(value)
    setDateError(value.length > 0 && !isValidDateFormat(value))
  }

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9\s]/g, '')
    const cleanedValue = value.replace(/\s/g, '')
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    setNewAmount(formattedValue)
    setAmountError(formattedValue.length > 0 && !isValidAmountFormat(formattedValue))
  }

  const handleEditExpense = (index) => {
    if (editMode && editingExpenseIndex === index) {
      setEditMode(false)
      setEditingExpenseIndex(null)
      setNewDescription('')
      setNewCategory('')
      setNewDate('')
      setNewAmount('')
      return
    }

    const expense = expenses[index]
    setNewDescription(expense.description)
    setNewCategory(expense.category)
    setNewDate(expense.date)
    setNewAmount(expense.sum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || '')
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
    description: newDescription.length < 3,
    category: !newCategory,
    date: !newDate || !isValidDateFormat(newDate),
    amount: !newAmount || !isValidAmountFormat(newAmount),
  }

  setErrors(newErrors)
  setDescriptionError(newErrors.description)
  setDateError(newErrors.date)
  setAmountError(newErrors.amount)

  if (Object.values(newErrors).some(Boolean)) return

  setNewDescription('')
  setNewCategory('')
  setNewDate('')
  setNewAmount('')
  setEditMode(false)
  setEditingExpenseIndex(null)
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
    setEditMode,
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
  }
}
