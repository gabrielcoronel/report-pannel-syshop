import axios from 'axios'
import { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { formatApiUrl } from '../utilities'
import { useSnackbar } from 'notistack'
import ReportTile from '../components/ReportTile'
import Header from '../components/Header'
import {
  CircularProgress,
  Stack,
  Typography,
  IconButton
} from '@mui/material'
import { Close } from '@mui/icons-material'
import HappySmile from '../assets/happy-smile.svg'
import configuration from '../configuration'

const getAllReports = async () => {
  const { data } = await axios.post(
    formatApiUrl("/reports_service/get_all_reports")
  )

  return data
}

const Empty = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        gap="1rem"
      >
        <img
          src={HappySmile}
          style={{ height: "7rem", width: "7rem" }}
        />

        <Typography
          variant="body1"
          color={configuration.SECONDARY_COLOR}
        >
          ¡No hay reportes sin procesar!
        </Typography>
      </Stack>
    </Stack>
  )
}

export default () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleError = () => {
    enqueueSnackbar(
      "No se pudieron obtener los reportes, revisa tu conexión a Internet",
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

  const reportsQuery = useQuery({
    queryKey: ["allReports"],
    queryFn: () => getAllReports(),
    onError: handleError,
  })


  return (
    <Fragment>
      <Header />

      {
        reportsQuery.isFetching ?
        (
          <Stack
            alignItems="center"
            justifyContent="center"
            height="100vh"
          >
            <CircularProgress
              color="secondary"
            />
          </Stack>
        ) :
        (
          reportsQuery.isSuccess ?
          (
            <Stack
              alignItems="center" 
              gap="1rem"
              padding="1.5rem"
            >
              {
                reportsQuery.data.length > 0 ?
                (
                  reportsQuery.data.map((report) => {
                    return (
                      <ReportTile
                        key={report.report_id}
                        report={report}
                      />
                    )
                  })
                ) :
                <Empty />
              }
            </Stack>
          ) :
          null
        )
      }
    </Fragment>
  )
}
