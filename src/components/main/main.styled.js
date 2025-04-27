import styled from 'styled-components'

export const MainBlock = styled.div`
    height: 100vh;
    background: #f4f5f6;
    margin-left: 118px;
`

export const H2 = styled.h2`
    font-weight: 700;
    font-size: 32px;
    line-height: 150%;
    letter-spacing: 0px;
`

export const MainPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ContentContainer = styled.div`
    display: flex;
    margin-top: 32px;
`

export const ExpensesTableContainer = styled.div`
    width: 789px;
    height: 618px;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export const NewExpenseContainer = styled.div`
    width: 379px;
    height: 618px;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-left: 40px;
    padding: 20px;
`

export const TableHeader = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 32px;
    padding-right: 32px;
`
export const H3 = styled.h3`
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0px;
    text-align: center;
    vertical-align: middle;
    margin-left: 32px;
`
export const FiltersContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
    margin-right: 8px;
    margin-top: 10px;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    letter-spacing: 0px;
    text-align: center;
    vertical-align: middle;
`

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    position: relative;
`

export const TableHead = styled.thead`
    color: #999999;
    border-bottom: 1px solid #ddd;
`

export const TableHeaderCell = styled.th`
    padding-top: 6px;
    padding-bottom: 6px;
    text-align: left;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    vertical-align: middle;

    &:first-child {
        padding-left: 32px;
    }

    &:last-child {
        padding-right: 50px;
    }

    &:nth-child(2) {
        padding-right: 30px;
    }
    &:nth-child(3) {
        width: 170px;
    }
`

export const TableRow = styled.tr`
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    vertical-align: middle;
`

export const TableCell = styled.td`
    padding-top: 20px;

    &:first-child {
        padding-left: 32px;
        padding-right: 10px;
    }

    &:last-child {
        padding-right: 32px;
    }

    &:nth-child(3) {
        width: 170px;
    }
`

export const NewExpenseTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`

export const InputLabel = styled.label`
    display: block;
    margin-bottom: 5px;
`

export const InputField = styled.input`
    width: 90%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
`

export const CategoryButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 15px;
`

export const CategoryButton = styled.button`
    background-color: #eee;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
    width: 45%;

    &:hover {
        background-color: #ddd;
    }
`

export const AddExpenseButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;

    &:hover {
        background-color: #3e8e41;
    }
`
