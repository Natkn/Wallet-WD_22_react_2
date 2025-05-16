import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(ChartDataLabels)
import { useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'

const ChartContainer = styled.div`
    width: 100%;
    height: 387px;
    padding: 20px;
    margin-bottom: 0;
    border-radius: 12px;
`
const ChartComponent = () => {
    const chartRef = useRef(null)

    const barChartData = useMemo(() => {
        return {
            labels: [
                'Еда',
                'Транспорт',
                'Жилье',
                'Развлечения',
                'Образование',
                'Другое',
            ],
            datasets: [
                {
                    data: [3590, 1835, 0, 1250, 600, 2306],
                    label: 'Расходы',
                    backgroundColor: [
                        '#D9B6FF',
                        '#FFB53D',
                        '#6EE4FE',
                        '#B0AEFF',
                        '#BCEC30',
                        '#FFB9B8',
                    ],
                    borderWidth: 0,
                    borderRadius: 12,
                    borderSkipped: false,
                    height: 387,
                },
            ],
        }
    }, [])

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance
            if (chartInstance) {
                chartInstance.destroy()
            }
        }
    }, [barChartData])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            datalabels: {
                display: true,
                color: 'black',
                font: {
                    weight: 600,
                    size: 16,
                    family: 'Montserrat',
                },
                formatter: (value) => value + ' ₽',
                anchor: 'end',
                align: 'top',
            },
        },
        scales: {
            x: {
                type: 'category',
                grid: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    display: true,
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                type: 'linear',
                display: false,
            },
        },
    }

    return (
        <ChartContainer>
            <Bar data={barChartData} options={options} ref={chartRef} />
        </ChartContainer>
    )
}

export default ChartComponent
