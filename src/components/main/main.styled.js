import styled from 'styled-components'

export const MainBlock = styled.div`
    height: 100vh;
    background: #f4f5f6;
    margin-left: 118px;
    margin-top: 32px;
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
    margin-left: 36px;
    padding: 32px;
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
    gap: 22px;
    margin-bottom: 10px;
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
        padding-right: 108px;
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
        padding-right: 12px;
    }

    &:nth-child(3) {
        width: 170px;
    }

    &:nth-child(5) {
        width: 12px;
        padding-left: 82px;
    }
`

export const NewExpenseTitle = styled.h2`
    margin-bottom: 26px;
`

export const InputLabel = styled.label`
    display: block;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0px;
`

export const InputField = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 22px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    vertical-align: middle;

    &:focus {
        border-color: #1fa46c;
        outline: none;
    }
`

export const CategoryButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 26px;
`

export const CategoryButton = styled.button`
    background-color: #eee;
    border: none;
    border-radius: 30px;
    padding-top: 8px;
    padding-right: 20px;
    padding-bottom: 8px;
    padding-left: 20px;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;

    &:hover {
        background-color: #ddd;
    }
`

export const AddExpenseButton = styled.button`
    background-color: #1fa46c;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1em;
    width: 313px;
    height: 39px;
    border-radius: 6px;
    gap: 12px;
    padding: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    text-align: center;
    vertical-align: middle;

    &:hover {
        background-color: #147049;
    }
`
