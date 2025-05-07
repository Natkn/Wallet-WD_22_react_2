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
} from 'date-fns'
import { ru } from 'date-fns/locale/ru'
import ChartComponent from '../analysisPage/Diagram'

function Analysispage() {
    const [months, setMonths] = useState([
        new Date(),
        addMonths(new Date(), 1),
        addMonths(new Date(), 2),
    ])
    const [selectedDate, setSelectedDate] = useState(null)
    const calendarRef = useRef(null)
    const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    const [activePeriod, setActivePeriod] = useState('month')
    const [showYearView, setShowYearView] = useState(false)

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
        setSelectedDate(day)
    }

    const isSelected = (day) => {
        return selectedDate && isSameDay(day, selectedDate)
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

        return (
            <S.YearContainer>
                {years.map((year) => (
                    <div key={year}>
                        <S.YearTitle>{year}</S.YearTitle>
                        <S.MonthsContainer>
                            {monthNames.map((monthName, index) => (
                                <S.MonthName key={`${year}-${index}`}>
                                    {monthName}
                                </S.MonthName>
                            ))}
                        </S.MonthsContainer>
                    </div>
                ))}
            </S.YearContainer>
        )
    }

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
                        <S.H3>9 581 ₽</S.H3>
                        <S.FiltersContainer>
                            <div>Расходы за 10 июля 2024 — 4 августа 2024</div>
                        </S.FiltersContainer>

                        <ChartComponent />
                    </S.TableHeader>
                </S.ExpensesTableContainer>
            </S.ContentContainer>
        </S.MainBlock>
    )
}

export default Analysispage
