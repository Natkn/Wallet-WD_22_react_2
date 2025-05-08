import styled from 'styled-components'

export const MainBlock = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: #f4f5f6;
    min-height: 100vh;
`

export const H2 = styled.h2`
    font-weight: 700;
    font-size: 32px;
    line-height: 150%;
    letter-spacing: 0px;
`

export const ContentContainer = styled.div`
    display: flex;
    margin-top: 32px;
    gap: 36px;
    flex-direction: row;
`

export const ExpensesTableContainer = styled.div`
    width: 789px;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 32px;
    overflow-x: auto;
`

export const NewExpenseContainer = styled.div`
    width: 379px;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 32px;
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const NewExpenseTitle = styled.h3`
    margin-bottom: 26px;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const PeriodElements = styled.div`
    display: flex;
    gap: 8px;
`

export const PeriodElement = styled.button`
    border: none;
    background: none;
    font-size: 12px;
    cursor: pointer;
    font-weight: ${({ $active }) => ($active ? 600 : 400)};
    color: ${({ $active }) => ($active ? '#1FA46C' : '#000')};
    text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};

    &:hover {
        color: #1FA46C;
        font-weight: 600;
        text-decoration: none;
    }
`

export const CalendarContainer = styled.div`
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
`

export const CalendarTitle = styled.div`
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
`

export const DaysOfWeek = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 12px;
    color: #999999;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 1;
    padding-bottom: 10px;
`

export const DayOfWeek = styled.div`
    flex: 1;
    text-align: center;
`

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    flex-grow: 1;
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #D9D9D9 transparent;

    &::-webkit-scrollbar {
        width: 6px;
        border-radius: 30px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 30px;
    }

    &::-webkit-scrollbar-thumb {
        background: #D9D9D9;
        border-radius: 30px;
        width: 6px;
    }
`

export const Day = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    background: ${({ $selected }) => ($selected ? '#DBFFE9' : 'transparent')};
    color: ${({ $today }) => ($today ? '#1FA46C' : '#000')}; /* Исправили $active на $today */

    &:hover {
        background: #DBFFE9;
    }
`

export const MonthHeader = styled.div`
    grid-column: 1 / -1;
    font-weight: 600;
    font-size: 16px;
    text-align: left;
    padding: 10px 0;
    color: #000;
`

export const Placeholder = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MonthList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-grow: 1;
    height: 150px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #D9D9D9 transparent;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 30px;
    }

    &::-webkit-scrollbar-thumb {
        background: #D9D9D9;
        border-radius: 30px;
        width: 6px;
    }
`

export const Month = styled.div`
    width: calc(33.33% - 7px);
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    background: ${({ $selected }) => ($selected ? '#DBFFE9' : 'transparent')};

    &:hover {
        background: #DBFFE9;
    }
`

export const TableHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
`

export const H3 = styled.h3`
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0px;
    vertical-align: middle;
`

export const FiltersContainer = styled.div`
    font-size: 12px;
    color: #999999;
`