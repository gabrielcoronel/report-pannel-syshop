import axios from 'axios'
import { Fragment } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatApiUrl } from '../utilities'
import { useSnackbar } from 'notistack'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material'
import { Check, Close } from '@mui/icons-material'
import configuration from '../configuration'

const styles = {
  card: {
    width: "80%",
    backgroundColor: configuration.BACKGROUND_COLOR
  }
}

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleDeleteReport = () => {
    deleteReportMutation.mutate({
      reportId: report.report_id
    })
  }

  const handleDeleteReportSuccess = () => {
    enqueueSnackbar(
      "Reporte procesado exitosamente",
      {
        variant: "success",
        autoHideDuration: 6000,
        action: (snackbarId) => (
          <IconButton
            onClick={() => closeSnackbar(snackbarId)}
          >
            <Close />
          </IconButton>
        )
      }
    )

    queryClient.refetchQueries({
      queryKey: ["allReports"]
    })
  }

  const handleDeleteReportError = () => {
    enqueueSnackbar(
      "No se pudo procesar el reporte, revisa tu conexión a Internet",
      {
        variant: "error",
        autoHideDuration: 6000,
        action: (snackbarId) => (
          <IconButton
            onClick={() => closeSnackbar(snackbarId)}
          >
            <Close />
          </IconButton>
        )
      }
    )
  }

  const deleteReportMutation = useMutation(
    ({ reportId }) => deleteReport(reportId),
    {
      onSuccess: handleDeleteReportSuccess,
      onerror: handleDeleteReportError
    }
  )

  return (
    <Fragment>
      <Card raised sx={styles.card}>
        <CardHeader
          titleTypographyProps={{ color: configuration.ACCENT_COLOR_1, fontSize: "2rem" }}
          subheaderTypographyProps={{ color: "white", fontSize: "1.2rem" }}
          title={report.user_name}
          subheader={formatDate(report.created_datetime)}
        />

        <CardContent>
          <Typography
            color="white"
            sx={{ fontSize: "1rem" }}
          >
            {report.content}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ justifyContent: "flex-end" }}
        >
          <IconButton onClick={handleDeleteReport}>
            {
              deleteReportMutation.isLoading ?
              <CircularProgress color="accent" /> :
              <Check sx={{ color: configuration.ACCENT_COLOR_1 }} />
            }
          </IconButton>
        </CardActions>
      </Card>
    </Fragment>
  )
}
