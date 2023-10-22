import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ReportsList from './pages/ReportsList'
import './assets/fonts/Cookie-Regular.ttf'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReportsList />
    </QueryClientProvider>
  )
}

export default App
