import * as S from './Analysis.styled'
import { useState, useRef, useEffect } from 'react'
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    getYear,
    addMonths,
    isWithinInterval,
    differenceInDays,
    differenceInWeeks,
} from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import ChartComponent from '../analysisPage/Diagram'
import { getTransactionsByPeriod } from '../../services/api'

function Analysispage() {
    const [expenses, setExpenses] = useState([])

    const [months, setMonths] = useState([
        new Date(),
        addMonths(new Date(), 1),
        addMonths(new Date(), 2),
    ])
    const [selectedRange, setSelectedRange] = useState([null, null])
    const calendarRef = useRef(null)
    const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    const [activePeriod, setActivePeriod] = useState('month')
    const [showYearView, setShowYearView] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [totalExpenses, setTotalExpenses] = useState(0)

    const loadMoreMonths = () => {
        setMonths((prevMonths) => {
            const lastMonth = prevMonths[prevMonths.length - 1]
            return [...prevMonths, addMonths(lastMonth, 1)]
        })
    }
    useEffect(() => {
        const calendarElement = calendarRef.current

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreMonths()
                }
            },
            {
                root: null,
                rootMargin: '200px',
                threshold: 0.1,
            }
        )

        if (calendarElement) {
            observer.observe(calendarElement.lastElementChild)
        }

        return () => {
            if (calendarElement) {
                observer.unobserve(calendarElement.lastElementChild)
            }
        }
    }, [months])

    const handleDayClick = (day) => {
        if (selectedRange[0] === null) {
            setSelectedRange([day, null])
        } else if (selectedRange[1] === null && day >= selectedRange[0]) {
            setSelectedRange([selectedRange[0], day])
        } else {
            setSelectedRange([day, null])
        }
    }

    const isSelected = (day) => {
        if (selectedRange[0] && selectedRange[1]) {
            return isWithinInterval(day, {
                start: selectedRange[0],
                end: selectedRange[1],
            })
        } else if (selectedRange[0]) {
            return isSameDay(day, selectedRange[0])
        }
        return false
    }

    const isCurrentDay = (day) => {
        return isToday(day)
    }

    const renderCalendarMonth = (date) => {
        const year = getYear(date)
        const monthName = format(date, 'MMMM', { locale: ru })

        const startDate = startOfMonth(date)
        const endDate = endOfMonth(date)
        const days = eachDayOfInterval({ start: startDate, end: endDate })

        return (
            <S.CalendarContainer key={date}>
                <S.CalendarTitle>
                    {monthName} {year}
                </S.CalendarTitle>
                <S.CalendarGrid>
                    {days.map((day) => (
                        <S.Day
                            key={day}
                            onClick={() => handleDayClick(day)}
                            className={`${isSelected(day) ? 'selected' : ''} ${
                                isCurrentDay(day) ? 'today' : ''
                            }`}
                        >
                            {format(day, 'd')}
                        </S.Day>
                    ))}
                </S.CalendarGrid>
            </S.CalendarContainer>
        )
    }

    const handleYearClick = () => {
        setShowYearView(!showYearView)
        setActivePeriod('year')
    }

    const handleMonthClick = () => {
        setShowYearView(false)
        setActivePeriod('month')
    }

    const renderYearView = () => {
        const startYear = 2025
        const endYear = 2100
        const years = []
        for (let year = startYear; year <= endYear; year++) {
            years.push(year)
        }

        const monthNames = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ]

        const handleYearMonthClick = (year, monthIndex) => {
            const monthDate = new Date(year, monthIndex, 1)

            if (!selectedRange[0]) {
                setSelectedRange([monthDate, null])
            } else if (monthDate >= selectedRange[0] && !selectedRange[1]) {
                setSelectedRange([selectedRange[0], monthDate])
            } else if (isSameDay(monthDate, selectedRange[0])) {
                setSelectedRange([null, null])
            } else if (
                selectedRange[1] &&
                isSameDay(monthDate, selectedRange[1])
            ) {
                setSelectedRange([null, null])
            } else {
                setSelectedRange([monthDate, null])
            }
        }

        const isMonthSelected = (year, monthIndex) => {
            if (selectedRange[0] && selectedRange[1]) {
                const monthDate = new Date(year, monthIndex, 1)
                return isWithinInterval(monthDate, {
                    start: selectedRange[0],
                    end: selectedRange[1],
                })
            } else if (selectedRange[0]) {
                const monthDate = new Date(year, monthIndex, 1)
                return isSameDay(monthDate, selectedRange[0])
            }
            return false
        }

        return (
            <S.YearContainer>
                {years.map((year) => (
                    <div key={year}>
                        <S.YearTitle>{year}</S.YearTitle>
                        <S.MonthsContainer>
                            {monthNames.map((monthName, index) => (
                                <S.MonthName
                                    key={`${year}-${index}`}
                                    onClick={() =>
                                        handleYearMonthClick(year, index)
                                    }
                                    className={`${
                                        isMonthSelected(year, index)
                                            ? 'selected'
                                            : ''
                                    }`}
                                >
                                    {monthName}
                                </S.MonthName>
                            ))}
                        </S.MonthsContainer>
                    </div>
                ))}
            </S.YearContainer>
        )
    }

    const formatDateRangeDays = () => {
        if (selectedRange[0] && selectedRange[1]) {
            const startDate = selectedRange[0]
            const endDate = selectedRange[1]

            const daysDifference = differenceInDays(endDate, startDate)
            const weeksDifference = differenceInWeeks(endDate, startDate)

            if (daysDifference === 0) {
                return format(startDate, 'd MMMM yyyy', { locale: ru })
            } else if (daysDifference < 7 && daysDifference > 0) {
                return `
                    ${format(startDate, 'd MMMM yyyy', { locale: ru })}
                    —
                    ${format(endDate, 'd MMMM yyyy', { locale: ru })}
                `
            } else if (weeksDifference >= 1) {
                const startFormatted = format(startDate, 'd MMMM', {
                    locale: ru,
                })
                const endFormatted = format(endDate, 'd MMMM yyyy', {
                    locale: ru,
                })
                return `
                    ${startFormatted}
                    —
                    ${endFormatted}
                `
            } else {
                return ' Некорректный период'
            }
        } else if (selectedRange[0]) {
            return format(selectedRange[0], ' d MMMM yyyy', { locale: ru })
        } else {
            return ''
        }
    }

    const formatDateRange = () => {
        const { start, end } = selectedRange

        if (!start) {
            return ' '
        }

        const startDate = start
        const endDate = end || start

        const startFormatted = format(startDate, ' MMMM yyyy', { locale: ru })
        const endFormatted = format(endDate, ' MMMM yyyy', { locale: ru })

        if (isSameDay(startDate, endDate)) {
            return `${startFormatted}`
        }

        if (getYear(startDate) === getYear(endDate)) {
            if (format(startDate, ' MMMM') === format(endDate, 'MMMM')) {
                return ` ${startFormatted}`
            }
            return ` ${format(startDate, 'MMMM', {
                locale: ru,
            })} — ${endFormatted}`
        }

        return ` ${startFormatted} — ${endFormatted}`
    }

    useEffect(() => {
        const fetchTransactions = async () => {
            if (selectedRange[0] && selectedRange[1]) {
                const startDate = format(selectedRange[0], 'yyyy-MM-dd')
                const endDate = format(selectedRange[1], 'yyyy-MM-dd')

                try {
                    const data = await getTransactionsByPeriod(
                        startDate,
                        endDate
                    )
                    setTransactions(data)
                    setExpenses(data)
                    const total = data.reduce(
                        (acc, transaction) => acc + transaction.amount,
                        0
                    )
                    setTotalExpenses(total)
                } catch (error) {
                    console.error('Failed to fetch transactions:', error)
                    setTransactions([])
                    setExpenses([])
                    setTotalExpenses(0)
                }
            } else {
                setTransactions([])
                setExpenses([])
                setTotalExpenses(0)
            }
        }

        fetchTransactions()
    }, [selectedRange, setTransactions])

    return (
        <S.MainBlock>
            <S.H2>Анализ расходов</S.H2>
            <S.NewExpenseContainer>
                <S.NewExpenseTitle>
                    Период
                    <S.PeriodElements>
                        <S.PeriodElement
                            $isActive={activePeriod === 'month'}
                            onClick={handleMonthClick}
                        >
                            Месяц
                        </S.PeriodElement>
                        <S.PeriodElement
                            $isActive={activePeriod === 'year'}
                            onClick={handleYearClick}
                        >
                            Год
                        </S.PeriodElement>
                    </S.PeriodElements>
                </S.NewExpenseTitle>

                {showYearView ? (
                    renderYearView()
                ) : (
                    <div ref={calendarRef}>
                        <S.DaysOfWeek>
                            {dayNames.map((dayName, index) => (
                                <S.DayOfWeek key={index}>{dayName}</S.DayOfWeek>
                            ))}
                        </S.DaysOfWeek>
                        {months.map((date) => renderCalendarMonth(date))}
                    </div>
                )}
            </S.NewExpenseContainer>
            <S.ContentContainer>
                <S.ExpensesTableContainer>
                    <S.TableHeader>
                        <S.H3>{totalExpenses} ₽</S.H3>{' '}
                        <S.FiltersContainer>
                            <div>
                                Расходы за
                                {formatDateRange()}
                                {formatDateRangeDays()}
                            </div>
                        </S.FiltersContainer>
                        <ChartComponent
                            transactions={transactions}
                            expenses={expenses}
                        />
                    </S.TableHeader>
                </S.ExpensesTableContainer>
            </S.ContentContainer>
        </S.MainBlock>
    )
}

export default Analysispage
