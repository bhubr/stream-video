import React, { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  makeStyles
} from '@material-ui/core'
import { serverUrl } from './config'

const useStyles = makeStyles({
  root: {
    marginTop: 24
  }
})

const Dashboard = () => {
  const classes = useStyles()
  const scan = () =>
    fetch(`${serverUrl}/api/scan`)
      .then((response) => response.json())
      .then(({ playlists }) => alert(`${playlists} created`))

  return (
    <Card className={classes.root}>
      <CardHeader title="Welcome to the administration" />
      <CardContent>
        <Typography>Lorem ipsum sic dolor amet...</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={scan}>
          Scan folders&amp;videos
        </Button>
      </CardActions>
    </Card>
  )
}

export default Dashboard
