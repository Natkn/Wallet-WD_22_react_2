import * as S from './main.styled';
import ExpenseForm from './ExpenseForm';
import ExpensesTable from './ExpensesTable';
import PropTypes from 'prop-types';

const MainLayout = ({
  sortedExpenses,
  newDescription,
  newCategory,
  newDate,
  newAmount,
  editMode,
  editingExpenseIndex,
  categories,
  categoryIcons,
  errors,
  descriptionError,
  dateError,
  amountError,
  handleEditExpense,
  handleAddExpense,
  handleDescriptionChange,
  handleDateChange,
  handleAmountChange,
  setNewDescription,
  setNewCategory,
  setNewDate,
  setNewAmount,
}) => (
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

MainLayout.propTypes = {
  sortedExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  newDescription: PropTypes.string.isRequired,
  newCategory: PropTypes.string.isRequired,
  newDate: PropTypes.string.isRequired,
  newAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  editMode: PropTypes.bool.isRequired,
  editingExpenseIndex: PropTypes.number,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryIcons: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  descriptionError: PropTypes.string,
  dateError: PropTypes.string,
  amountError: PropTypes.string,
  handleEditExpense: PropTypes.func.isRequired,
  handleAddExpense: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleAmountChange: PropTypes.func.isRequired,
  setNewDescription: PropTypes.func.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  setNewDate: PropTypes.func.isRequired,
  setNewAmount: PropTypes.func.isRequired,
};

export default MainLayout;