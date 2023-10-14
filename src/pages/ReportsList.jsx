import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { formatApiUrl } from '../utilities'
import {
  CircularProgress
} from '@mui/material'
import ReportTile from '../components/ReportTile'

const getAllReports = async () => {
  const { data } = await axios.post(
    formatApiUrl("/reports_service/get_all_reports")
  )

  return data
}

export default () => {
  const reportsQuery = useQuery({
    queryKey: ["allReports"],
    queryFn: () => getAllReports(),
    onSuccess: () => console.log("éxito listado"),
    onError: () => console.log("error listado"),
  })

  if (reportsQuery.isFetching) {
    return (
      <CircularProgress />
    )
  }

  const reportsTiles = reportsQuery.data.map((report) => {
    return (
      <ReportTile
        key={report.report_id}
        report={report}
      />
    )
  })

  return (
    <div>
      {reportsTiles}
    </div>
  )
}
