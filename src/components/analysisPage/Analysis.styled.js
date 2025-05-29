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
    display: flex;
    flex-direction: column;
    height: 540px;
`

export const NewExpenseContainer = styled.div`
    width: 379px;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 feature-env
    padding: 32px;
    display: flex;
    flex-direction: column;
    height: 540px;

    margin-right: 32px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-right: 16px;

    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 400px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 1px;
    }

    &::-webkit-scrollbar-track {
        scroll-padding-top: 100px;
        background-color: transparent;
        margin-top: 100px;
        padding-top: 100px;
    }

    scrollbar-width: thin;
    scrollbar-color: #d9d9d9 transparent;

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

    gap: 12px;
    margin-top: 8px;
`
export const PeriodElement = styled.div`
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    letter-spacing: 0px;
    text-align: center;
    vertical-align: middle;
    height: 18px;
    border-bottom: ${(props) =>
        props.$isActive ? '1px solid #1fa46c' : 'none'};
    color: ${(props) => (props.$isActive ? ' #1fa46c' : 'none')};
    &:hover {
        color: #1fa46c;
        font-weight: 600;
        cursor: pointer;
        border-bottom: 0.5px solid #1fa46c;
    }
`

export const InputLabel = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`

export const CategoryButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
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
    border-bottom: 1px solid #e0e0e0;
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
    height: 472px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 6px;
    -webkit-overflow-scrolling: auto;
    overflow-y: overlay;
    scrollbar-width: thin;
    scrollbar-color: #D9D9D9 transparent;
    &::-webkit-scrollbar {
        width: 6px !important;
        border-radius: 30px !important;
    }
    &::-webkit-scrollbar-track {
        background: transparent !important;
        border-radius: 30px !important;
    }
    &::-webkit-scrollbar-thumb {
        background: #D9D9D9 !important;
        border-radius: 30px !important;
    }
    &::-webkit-scrollbar-button {
        display: none !important;
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
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;

    background: ${({ $selected }) => ($selected ? '#DBFFE9' : '#F4F5F6')};
    color: ${({ $today }) => ($today ? '#1FA46C' : '#000')};


    &:hover {
        background: #DBFFE9;
        color: #1FA46C;
=
    &.selected {
        background-color: #dbffe9;
        color: #1fa46c;
    }

    &.today {
        background-color: #9cea9fa6;

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
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
    height: 504px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-right: 6px;
    -webkit-overflow-scrolling: auto;
    overflow-y: overlay;
    scrollbar-width: thin;
    scrollbar-color: #D9D9D9 transparent;
    &::-webkit-scrollbar {
        width: 6px !important;
        border-radius: 30px !important;
    }
    &::-webkit-scrollbar-track {
        background: transparent !important;
        border-radius: 30px !important;
    }
    &::-webkit-scrollbar-thumb {
        background: #D9D9D9 !important;
        border-radius: 30px !important;
    }
    &::-webkit-scrollbar-button {
        display: none !important;
    }
`

export const YearHeader = styled.div`
    font-weight: 600;
    font-size: 16px;
    text-align: left;
    padding: 10px 0;
    color: #000;
`

export const MonthGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
`

export const Month = styled.div`
    padding: 10px;
    text-align: center;
    cursor: pointer;
    border-radius: 30px;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;

    background: ${({ $selected }) => ($selected ? '#DBFFE9' : '#F4F5F6')};
    color: ${({ $today }) => ($today ? '#1FA46C' : '#000')};

    &:hover {
        background: #DBFFE9;
        color: #1FA46C;
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

export const YearContainer = styled.div`
    border-bottom: 1px solid #999999;
`

export const YearTitle = styled.h3`
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0px;
    margin-bottom: 12px;
    margin-top: 12px;
`

export const MonthsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
    color: #000000;
`

export const MonthName = styled.div`
    width: 102px;
    height: 34px;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    background-color: #f4f5f6;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;

    &.selected {
        background-color: #dbffe9;
        color: #1fa46c;
    }
`

