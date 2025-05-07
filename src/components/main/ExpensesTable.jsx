import * as S from './main.styled';
import PropTypes from 'prop-types';

const ExpensesTable = ({ expenses, onEdit, editMode, editingExpenseIndex }) => (
  <S.ExpensesTableContainer>
    <S.TableHeader>
      <S.H3>Таблица расходов</S.H3>
      <S.FiltersContainer>
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
        {expenses.map((expense, index) => (
          <S.TableRow key={index} $isEditing={editMode && editingExpenseIndex === index}>
            <S.TableCell>{expense.description}</S.TableCell>
            <S.TableCell>{expense.category}</S.TableCell>
            <S.TableCell>{expense.date}</S.TableCell>
            <S.TableCell>{expense.amount}</S.TableCell>
            <S.TableCell>
              <S.EditButton onClick={() => onEdit(index)}>
                <S.EditIcon
                  src={editMode && editingExpenseIndex === index ? 'EditBtnGreen.svg' : 'EditBtn.svg'}
                  alt="Edit icon"
                />
              </S.EditButton>
            </S.TableCell>
          </S.TableRow>
        ))}
      </tbody>
    </S.Table>
  </S.ExpensesTableContainer>
);

ExpensesTable.propTypes = {
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
      })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired,
    editingExpenseIndex: PropTypes.number,
};

export default ExpensesTable;