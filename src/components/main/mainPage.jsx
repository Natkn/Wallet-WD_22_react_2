import { useState, useEffect } from 'react'
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../services/api'
import FoodIcon from '../icons/FoodIcon'
import { useExpenses } from '../../ExpenseContext'
import MainLayout from './MainLayout'
import { useExpenseForm } from '../../hooks/useExpenseForm'
import * as S from './main.styled'

const CATEGORY_MAPPING = {
  'Еда': 'food',
  'Транспорт': 'transport',
  'Жильё': 'housing',
  'Развлечения': 'joy',
  'Образование': 'education',
  'Другое': 'others',
}

const REVERSE_CATEGORY_MAPPING = {
  'food': 'Еда',
  'transport': 'Транспорт',
  'housing': 'Жильё',
  'joy': 'Развлечения',
  'education': 'Образование',
  'others': 'Другое',
}

function MainPage() {
  const { expenses = [], setExpenses } = useExpenses() || {}
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('Дата')
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Получаем токен из localStorage
  const userData = JSON.parse(localStorage.getItem('userInfo'))
  const token = userData?.token

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
    setEditMode,
    editingExpenseIndex,
    handleDescriptionChange,
    handleDateChange,
    handleAmountChange,
    handleEditExpense,
  } = useExpenseForm(expenses, setExpenses)

  const categories = ['Еда', 'Транспорт', 'Жильё', 'Развлечения', 'Образование', 'Другое']
  const sortOptions = ['Дата', 'Сумма']

  const loadTransactions = async () => {
    try {
      setIsLoading(true)
      const params = {
        sortBy: sortOrder === 'Дата' ? 'date' : 'sum',
        filterBy: selectedCategory ? CATEGORY_MAPPING[selectedCategory] : undefined,
      }
      const data = await getTransactions(params)
      const formattedData = data.map((transaction) => ({
        ...transaction,
        category: REVERSE_CATEGORY_MAPPING[transaction.category],
        date: new Date(transaction.date).toLocaleDateString('ru-RU', { timeZone: 'UTC' }),
        amount: `${transaction.sum} ₽`,
      }))
      setExpenses(formattedData)
    } catch (error) {
      console.error('Ошибка загрузки транзакций:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Загружаем транзакции только если token доступен
  useEffect(() => {
    if (!token) return
    loadTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, selectedCategory, sortOrder])

  const handleAddExpense = async () => {
    try {
      if (newDescription.trim().length < 3) {
        alert('Описание должно содержать минимум 3 символа')
        return
      }

      const transactionData = {
        description: newDescription.trim(),
        sum: parseFloat(newAmount.replace(/\s/g, '')),
        category: CATEGORY_MAPPING[newCategory],
        date: newDate,
      }

      if (editMode) {
        await updateTransaction(expenses[editingExpenseIndex]._id, transactionData)
      } else {
        await createTransaction(transactionData)
      }

      // Очистка формы
      setNewDescription('')
      setNewCategory('')
      setNewDate('')
      setNewAmount('')
      setEditMode(false)

      await loadTransactions()
    } catch (error) {
      console.error('Ошибка сохранения транзакции:', error)
      alert(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id)
      await loadTransactions()
    } catch (error) {
      console.error('Ошибка удаления транзакции:', error)
      alert(error.message)
    }
  }

  const categoryIcons = {
    Еда: <FoodIcon />,
    Транспорт: <S.CategoryIcon src="/car (1).svg" alt="Transport icon" />,
    Жильё: <S.CategoryIcon src="/HouseIcon.svg" alt="Housing icon" />,
    Развлечения: <S.CategoryIcon src="/PlayIcon.svg" alt="Entertainment icon" />,
    Образование: <S.CategoryIcon src="/StudyIcon.svg" alt="Education icon" />,
    Другое: <S.CategoryIcon src="/OtherIcon.svg" alt="Other icon" />,
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

  function filterExpenses(expenses, selectedCategory) {
    return selectedCategory
      ? (expenses || []).filter((expense) => expense?.category === selectedCategory)
      : expenses || []
  }

  function sortExpenses(expenses, sortOrder) {
    return [...(expenses || [])].sort((a, b) => {
      if (sortOrder === 'Дата') {
        const dateA = a?.date ? new Date(a.date.split('.').reverse().join('-')) : new Date()
        const dateB = b?.date ? new Date(b.date.split('.').reverse().join('-')) : new Date()
        return dateB - dateA
      } else {
        const amountA = a?.amount ? parseFloat(a.amount.replace(' ₽', '').replace(' ', '')) : 0
        const amountB = b?.amount ? parseFloat(b.amount.replace(' ₽', '').replace(' ', '')) : 0
        return amountB - amountA
      }
    })
  }

  const filteredExpenses = filterExpenses(expenses, selectedCategory)
  const sortedExpenses = sortExpenses(filteredExpenses, sortOrder)

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
      selectedCategory={selectedCategory}
      sortOrder={sortOrder}
      isCategoryDropdownOpen={isCategoryDropdownOpen}
      isSortDropdownOpen={isSortDropdownOpen}
      toggleCategoryDropdown={toggleCategoryDropdown}
      toggleSortDropdown={toggleSortDropdown}
      handleCategorySelect={handleCategorySelect}
      handleSortSelect={handleSortSelect}
      sortOptions={sortOptions}
      onDelete={handleDelete}
    />
  )
}

export default MainPage
