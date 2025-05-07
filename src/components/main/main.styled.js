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
`

export const ExpensesTableContainer = styled.div`
    width: 789px;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 32px;
`

export const NewExpenseContainer = styled.div`
    width: 379px;
    border-radius: 30px;
    background-color: #fff;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 32px;
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
    display: flex;
    gap: 16px;
    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    letter-spacing: 0px;
    vertical-align: middle;
`

export const FilterWrapper = styled.div`
    position: relative;
    display: inline-block;
`

export const FilterButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    display: block;
    align-items: center;
    gap: 8px;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    cursor: pointer;
`

export const GreenLink = styled.span`
    color: #1fa46c;
    &:hover {
        text-decoration: underline;
    }
`

export const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    padding: 12px;
`

export const DropdownItem = styled.div`
    padding: 8px 20px;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 7px;
    width: fit-content;
    border-radius: 30px;
    background-color: #f0f0f0;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        background-color: #dbffe9;
        color: #1fa46c;

        img,
        svg {
            filter: brightness(0) saturate(100%) invert(39%) sepia(70%)
                saturate(2756%) hue-rotate(88deg) brightness(97%) contrast(99%);
        }
    }
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
        padding-left: 0;
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
    background-color: ${(props) =>
        props.$isEditing ? '#DBFFE9' : 'transparent'};
    color: ${(props) => (props.$isEditing ? '#1FA46C' : 'black')};
`

export const TableCell = styled.td`
    padding-top: 14px;

    &:first-child {
        padding-left: 0;
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

export const EditButton = styled.button`
    border: none;
    background: none;
    padding: 0 8px;
    cursor: pointer;
`

export const EditIcon = styled.img`
    width: 12px;
    height: 12px;
`

export const NewExpenseTitle = styled.h2`
    margin-bottom: 26px;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
`

export const InputLabel = styled.label`
    display: block;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0px;
`

export const ErrorStar = styled.span`
    color: red;
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
    border: none;
    border-radius: 30px;
    padding: 8px 20px;
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
    background-color: #f0f0f0;

    &:hover {
        background-color: #dbffe9;
        color: #1fa46c;

        img,
        svg {
            filter: brightness(0) saturate(100%) invert(39%) sepia(70%)
                saturate(2756%) hue-rotate(88deg) brightness(97%) contrast(99%);
        }
    }

    &.selected {
        background-color: #dbffe9;
        color: #1fa46c;

        img,
        svg {
            filter: brightness(0) saturate(100%) invert(39%) sepia(70%)
                saturate(2756%) hue-rotate(88deg) brightness(97%) contrast(99%);
        }
    }
`

export const CategoryIcon = styled.img`
    width: 14px;
    height: 14px;
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
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #147049;
    }
`