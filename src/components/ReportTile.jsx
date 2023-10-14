import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatApiUrl } from '../utilities'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress
} from '@mui/material'
import { DeleteIcon } from '@mui/icons-material'

const deleteReport = async (reportId) => {
  const payload = {
    report_id: reportId
  }

  await axios.post(
    formatApiUrl("/reports_service/delete_report"),
    payload
  )
}

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString)

  const day = date.getDate() + 1
  const month = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "noviembre", "diciembre"
  ][date.getMonth()]
  const year = date.getFullYear()
  const hours = (date.getHours() % 12).toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  const formatted = `${day} de ${month} de ${year} a las ${hours}:${minutes}`

  return formatted
}

export default ({ report }) => {
  const queryClient = useQueryClient()

  const handleDeleteReport = () => {
    deleteReportMutation.mutate({
      reportId: report.report_id
    })
  }

  const handleDeleteReportSuccess = () => {
    console.log("éxito")

    queryClient.refetchQueries({
      queryKey: ["allReports"]
    })
  }

  const handleDeleteReportError = () => {
    console.log("error")
  }

  const deleteReportMutation = useMutation(
    ({ reportId }) => deleteReport(reportId),
    {
      onSuccess: handleDeleteReportSuccess,
      onerror: handleDeleteReportError
    }
  )

  return (
    <Card sx={{ width: "80%" }}>
      <CardHeader
        title={report.user_name}
        subheader={formatDate(report.created_datetime)}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {report.content}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton onClick={handleDeleteReport}>
          {
            deleteReportMutation.isLoading ?
            <CircularProgress /> :
            <DeleteIcon />
          }
        </IconButton>
      </CardActions>
    </Card>
  )
}
