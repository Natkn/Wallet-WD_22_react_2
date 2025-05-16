import * as S from './Analysis.styled'
import { useState } from 'react'
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    getYear,
    addMonths,
    subMonths,
} from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import ChartComponent from '../analysisPage/Diagram'

function Analysispage() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)

    const year = getYear(currentDate)
    const monthName = format(currentDate, 'MMMM', { locale: ru })

    const startDate = startOfMonth(currentDate)
    const endDate = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: startDate, end: endDate })

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1))
    }

    const handleDayClick = (day) => {
        setSelectedDate(day)
    }

    const isSelected = (day) => {
        return selectedDate && isSameDay(day, selectedDate)
    }

    const isCurrentDay = (day) => {
        return isToday(day)
    }
    const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

    return (
        <S.MainBlock>
            <S.H2>Анализ расходов</S.H2>
            <S.NewExpenseContainer>
                <S.NewExpenseTitle>
                    Период
                    <S.PeriodElements>
                        <S.PeriodElement>Месяц</S.PeriodElement>
                        <S.PeriodElement>Год</S.PeriodElement>
                    </S.PeriodElements>
                </S.NewExpenseTitle>

                <S.CalendarContainer>
                    <S.DaysOfWeek>
                        {dayNames.map((dayName, index) => (
                            <S.DayOfWeek key={index}>{dayName}</S.DayOfWeek>
                        ))}
                    </S.DaysOfWeek>
                    <S.CalendarTitle>
                        {monthName} {year}
                    </S.CalendarTitle>
                    <S.CalendarGrid>
                        {days.map((day) => (
                            <S.Day
                                key={day}
                                onClick={() => handleDayClick(day)}
                                className={`${
                                    isSelected(day) ? 'selected' : ''
                                } ${isCurrentDay(day) ? 'today' : ''}`}
                            >
                                {format(day, 'd')}
                            </S.Day>
                        ))}
                    </S.CalendarGrid>

                    <S.CalendarHeader>
                        <S.CalendarControls>
                            <S.CalendarButton onClick={handlePrevMonth}>
                                &lt;
                            </S.CalendarButton>
                            <S.CalendarButton onClick={handleNextMonth}>
                                &gt;
                            </S.CalendarButton>
                        </S.CalendarControls>
                    </S.CalendarHeader>
                </S.CalendarContainer>
            </S.NewExpenseContainer>
            <S.ContentContainer>
                <S.ExpensesTableContainer>
                    <S.TableHeader>
                        <S.H3>9 581 ₽</S.H3>
                        <S.FiltersContainer>
                            <div>Расходы за 10 июля 2024 — 4 августа 2024</div>
                        </S.FiltersContainer>
                    </S.TableHeader>

                    <ChartComponent />
                </S.ExpensesTableContainer>
            </S.ContentContainer>
        </S.MainBlock>
    )
}

export default Analysispage
