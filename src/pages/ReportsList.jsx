import axios from 'axios'
import { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { formatApiUrl } from '../utilities'
import ReportTile from '../components/ReportTile'
import Header from '../components/Header'
import { CircularProgress, Stack } from '@mui/material'

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
      <Stack
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Stack>
    )
  }

  // const reportsTiles = reportsQuery.data.map((report) => {
  //   return (
  //     <ReportTile
  //       key={report.report_id}
  //       report={report}
  //     />
  //   )
  // })

  const reportsTiles = [
    <ReportTile
      report={{
        user_name: "Gabriel",
        content: "Este mae subio algo indebido",
        created_datetime: "Sun Oct 22 2023 15:00:41"
      }}
    />,
    <ReportTile
      report={{
        user_name: "Gabriel",
        content: "Este mae subio algo indebido",
        created_datetime: "Sun Oct 22 2023 15:00:41"
      }}
    />,
    <ReportTile
      report={{
        user_name: "Gabriel",
        content: "Este mae subio algo indebido",
        created_datetime: "Sun Oct 22 2023 15:00:41"
      }}
    />,
    <ReportTile
      report={{
        user_name: "Gabriel",
        content: "Este mae subio algo indebido",
        created_datetime: "Sun Oct 22 2023 15:00:41"
      }}
    />,
  ]

  return (
    <Fragment>
      <Header />

      <Stack
        alignItems="center" 
        gap="1rem"
        padding="1.5rem"
      >
        {reportsTiles}
      </Stack>
    </Fragment>
  )
}
