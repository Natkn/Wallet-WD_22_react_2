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
    startOfYear,
    endOfYear,
    eachMonthOfInterval,
    getMonth,
    getDay,
} from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import ChartComponent from './Diagram'
import { useExpenses } from '../../ExpenseContext'

function AnalysisPage() {
    const { expenses = [] } = useExpenses() || {}
    const [currentDate] = useState(new Date()) // Убрали setCurrentDate
    const [selectedStartDate, setSelectedStartDate] = useState(new Date())
    const [selectedEndDate, setSelectedEndDate] = useState(new Date())
    const [selectedPeriod, setSelectedPeriod] = useState('Месяц')
    const year = getYear(currentDate)

    const getPeriodRange = () => {
        if (selectedStartDate && selectedEndDate) {
            return { start: selectedStartDate, end: selectedEndDate }
        }
        return { start: startOfMonth(currentDate), end: endOfMonth(currentDate) }
    }

    const periodRange = getPeriodRange()
    
    // Все дни года для вкладки "Месяц"
    const daysOfYear = eachDayOfInterval({ start: startOfYear(currentDate), end: endOfYear(currentDate) })
    
    // Для вкладки "Год" отображаем месяцы
    const months = eachMonthOfInterval({ start: startOfYear(currentDate), end: endOfYear(currentDate) })

    const handleDayClick = (day) => {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            setSelectedStartDate(day)
            setSelectedEndDate(null)
        } else if (selectedStartDate && !selectedEndDate) {
            if (day < selectedStartDate) {
                setSelectedEndDate(selectedStartDate)
                setSelectedStartDate(day)
            } else {
                setSelectedEndDate(day)
            }
        }
    }

    const handleMonthClick = (month) => {
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            setSelectedStartDate(month)
            setSelectedEndDate(null)
        } else if (selectedStartDate && !selectedEndDate) {
            if (month < selectedStartDate) {
                setSelectedEndDate(selectedStartDate)
                setSelectedStartDate(month)
            } else {
                setSelectedEndDate(month)
            }
        }
    }

    const isSelectedDay = (day) => {
        if (!selectedStartDate || !selectedEndDate) return isSameDay(day, selectedStartDate)
        return day >= selectedStartDate && day <= selectedEndDate
    }

    const isSelectedMonth = (month) => {
        if (!selectedStartDate || !selectedEndDate) return isSameDay(month, selectedStartDate)
        return month >= selectedStartDate && month <= selectedEndDate
    }

    const isCurrentDay = (day) => {
        return isToday(day)
    }

    const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

    const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date.split('.').reverse().join('-'))
        return expenseDate >= periodRange.start && expenseDate <= periodRange.end
    })

    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount.replace(' ₽', '').replace(' ', '')), 0)

    // Логика для отображения дней года с выравниванием по дням недели
    let currentMonth = null
    const calendarDays = []
    daysOfYear.forEach((day) => {
        const dayMonth = getMonth(day)
        if (currentMonth !== dayMonth) {
            currentMonth = dayMonth
            // Добавляем заголовок месяца
            calendarDays.push({
                type: 'monthHeader',
                month: format(day, 'MMMM', { locale: ru }),
            })
            // Добавляем пустые ячейки для выравнивания первого дня месяца
            const firstDayOfMonth = getDay(startOfMonth(day)) // 0 (вс), 1 (пн), ..., 6 (сб)
            const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Смещение для пн-пт
            for (let i = 0; i < offset; i++) {
                calendarDays.push({ type: 'placeholder' })
            }
        }
        // Добавляем сам день
        calendarDays.push({
            type: 'day',
            day,
        })
    })

    return (
        <S.MainBlock>
            <S.H2>Анализ расходов</S.H2>
            <S.ContentContainer>
                <S.NewExpenseContainer>
                    <S.NewExpenseTitle>
                        Период
                        <S.PeriodElements>
                            {['Месяц', 'Год'].map((period) => (
                                <S.PeriodElement
                                    key={period}
                                    $active={selectedPeriod === period}
                                    onClick={() => setSelectedPeriod(period)}
                                >
                                    {period}
                                </S.PeriodElement>
                            ))}
                        </S.PeriodElements>
                    </S.NewExpenseTitle>

                    <S.CalendarContainer>
                        <S.CalendarTitle>
                            {year}
                        </S.CalendarTitle>
                        {selectedPeriod === 'Месяц' && (
                            <>
                                <S.DaysOfWeek>
                                    {dayNames.map((dayName, index) => (
                                        <S.DayOfWeek key={index}>{dayName}</S.DayOfWeek>
                                    ))}
                                </S.DaysOfWeek>
                                <S.CalendarGrid>
                                    {calendarDays.map((item, index) => {
                                        if (item.type === 'monthHeader') {
                                            return (
                                                <S.MonthHeader key={`month-${index}`}>
                                                    {item.month}
                                                </S.MonthHeader>
                                            )
                                        } else if (item.type === 'placeholder') {
                                            return <S.Placeholder key={`placeholder-${index}`} />
                                        } else {
                                            const day = item.day
                                            return (
                                                <S.Day
                                                    key={day.toISOString()}
                                                    onClick={() => handleDayClick(day)}
                                                    $selected={isSelectedDay(day)}
                                                    $today={isCurrentDay(day)}
                                                >
                                                    {format(day, 'd')}
                                                </S.Day>
                                            )
                                        }
                                    })}
                                </S.CalendarGrid>
                            </>
                        )}
                        {selectedPeriod === 'Год' && (
                            <S.MonthList>
                                {months.map((month) => (
                                    <S.Month
                                        key={month.toISOString()}
                                        onClick={() => handleMonthClick(month)}
                                        $selected={isSelectedMonth(month)}
                                    >
                                        {format(month, 'MMMM', { locale: ru })}
                                    </S.Month>
                                ))}
                            </S.MonthList>
                        )}
                    </S.CalendarContainer>
                </S.NewExpenseContainer>
                <S.ExpensesTableContainer>
                    <S.TableHeader>
                        <S.H3>{totalAmount.toFixed(0)} ₽</S.H3>
                        <S.FiltersContainer>
                            Расходы за {format(periodRange.start, 'dd MMMM yyyy', { locale: ru })} –{' '}
                            {format(periodRange.end, 'dd MMMM yyyy', { locale: ru })}
                        </S.FiltersContainer>
                    </S.TableHeader>
                    <ChartComponent expenses={filteredExpenses} />
                </S.ExpensesTableContainer>
            </S.ContentContainer>
        </S.MainBlock>
    )
}

export default AnalysisPage