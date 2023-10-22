import { ThemeProvider, createTheme } from '@mui/material'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import ReportsList from './pages/ReportsList'
import './assets/fonts/Cookie-Regular.ttf'
import configuration from './configuration'

const queryClient = new QueryClient()
const theme = createTheme({
  palette: {
    accent: {
      main: configuration.ACCENT_COLOR_1
    },
    secondary: {
      main: configuration.SECONDARY_COLOR
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <ReportsList />
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
