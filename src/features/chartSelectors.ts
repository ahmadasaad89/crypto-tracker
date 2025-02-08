import { RootState } from '../store/store'

export const selectChartData = (state: RootState) => state.chart.chartData
export const selectChartLoading = (state: RootState) => state.chart.loading
export const selectChartError = (state: RootState) => state.chart.error
export const selectTimeRange = (state: RootState) => state.chart.timeRange
