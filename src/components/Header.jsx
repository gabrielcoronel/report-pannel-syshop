import { Stack, Typography } from '@mui/material'
import SyShopLogo from '../assets/syshop-logo.png'
import configuration from '../configuration'

const styles = {
  container: {
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
  },
  title: {
    fontFamily: "Cookie",
    fontSize: "2rem",
    color: configuration.SECONDARY_COLOR
  }
}

export default () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      padding="1rem"
      sx={styles.container}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <img
          src={SyShopLogo}
          style={{ height: "4rem", width: "4rem" }}
        />

        <span
          style={styles.title}
        >
          SyShop
        </span>
      </Stack>

      <Typography
        variant="body1"
        color={configuration.SECONDARY_COLOR}
      >
        Panel de Reportes
      </Typography>
    </Stack>
  )
}
