import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import moment from 'moment'
import cx from 'classnames'

import cardsStyles from './Cards.module.sass'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if(!confirmed) {
    return 'Loading...'
  } else {
    return (
      <div className={cardsStyles.container}>
        <Grid container spacing={3} justify="center">
          <Grid item component={Card} xs={12} md={3} className={cx(cardsStyles.card, cardsStyles.active)}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Infected</Typography>
              <Typography variant="h5">
                <CountUp 
                  start={0}
                  end={confirmed.value}
                  duration={2.5}
                  separator=" "
                />
              </Typography>
              <Typography color="textSecondary">{
                moment(lastUpdate).format("YYYY-MM-DD")}
              </Typography>
              <Typography variant="body2">Number of active cases of COVID-19</Typography>
            </CardContent>
          </Grid>
          <Grid item component={Card} xs={12} md={3} className={cx(cardsStyles.card, cardsStyles.recovered)}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Recovered</Typography>
              <Typography variant="h5">
                <CountUp 
                  start={0}
                  end={recovered.value}
                  duration={2.5}
                  separator=" "
                />
              </Typography>
              <Typography color="textSecondary">{
                moment(lastUpdate).format("YYYY-MM-DD")}
              </Typography>
              <Typography variant="body2">Number of recoveries cases of COVID-19</Typography>
            </CardContent>
          </Grid>
          <Grid item component={Card} xs={12} md={3} className={cx(cardsStyles.card, cardsStyles.deaths)}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Deaths</Typography>
              <Typography variant="h5">
                <CountUp 
                  start={0}
                  end={deaths.value}
                  duration={2.5}
                  separator=" "
                />
              </Typography>
              <Typography color="textSecondary">{
                moment(lastUpdate).format("YYYY-MM-DD")}
              </Typography>
              <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Cards