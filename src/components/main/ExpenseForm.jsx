import PropTypes from 'prop-types';
import * as S from './main.styled';

const ExpenseForm = ({
  newDescription,
  newCategory,
  setNewCategory,
  newDate,
  newAmount,
  handleAddExpense,
  editMode,
  categories,
  categoryIcons,
  errors,
  descriptionError,
  dateError,
  amountError,
  handleDescriptionChange,
  handleDateChange,
  handleAmountChange,
}) => (
  <S.NewExpenseContainer>
    <S.NewExpenseTitle>{editMode ? 'Редактирование' : 'Новый расход'}</S.NewExpenseTitle>
    <S.InputLabel htmlFor="description">
      {(errors.description || descriptionError) && <span style={{ color: 'red' }}> *</span>} Описание:
    </S.InputLabel>
    <S.InputField
      type="text"
      id="description"
      placeholder="Введите описание"
      value={newDescription}
      onChange={handleDescriptionChange}
    />
    <S.InputLabel>{errors.category && <span style={{ color: 'red' }}> *</span>} Категория:</S.InputLabel>
    <S.CategoryButtonsContainer>
      {categories.map((category) => (
        <S.CategoryButton
          key={category}
          onClick={() => setNewCategory(category)}
          className={newCategory === category ? 'selected' : ''}
        >
          {categoryIcons[category]}
          {category}
        </S.CategoryButton>
      ))}
    </S.CategoryButtonsContainer>
    <S.InputLabel htmlFor="date">{(errors.date || dateError) && <span style={{ color: 'red' }}> *</span>} Дата:</S.InputLabel>
    <S.InputField
      id="date"
      placeholder="дд.мм.гггг"
      value={newDate}
      onChange={handleDateChange}
    />
    <S.InputLabel htmlFor="amount">{(errors.amount || amountError) && <span style={{ color: 'red' }}> *</span>} Сумма:</S.InputLabel>
    <S.InputField
      id="amount"
      placeholder="Введите сумму"
      value={newAmount}
      onChange={handleAmountChange}
    />
    <S.AddExpenseButton onClick={handleAddExpense}>
      {editMode ? 'Сохранить редактирование' : 'Добавить новый расход'}
    </S.AddExpenseButton>
  </S.NewExpenseContainer>
);

ExpenseForm.propTypes = {
  newDescription: PropTypes.string.isRequired,
  setNewDescription: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  newDate: PropTypes.string.isRequired,
  setNewDate: PropTypes.func.isRequired,
  newAmount: PropTypes.string.isRequired,
  setNewAmount: PropTypes.func.isRequired,
  handleAddExpense: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryIcons: PropTypes.objectOf(PropTypes.node).isRequired,
  errors: PropTypes.object.isRequired,
  descriptionError: PropTypes.bool.isRequired,
  dateError: PropTypes.bool.isRequired,
  amountError: PropTypes.bool.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleAmountChange: PropTypes.func.isRequired,
};

export default ExpenseForm;