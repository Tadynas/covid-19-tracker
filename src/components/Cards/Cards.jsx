import React from 'react'
import { Grid } from '@material-ui/core'
import moment from 'moment'

import CardItem from '../CardItem/CardItem'
import cardsStyles from './Cards.module.sass'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if(!lastUpdate) {
    return <p>Loading...</p>
  } else if(!confirmed && !recovered && !deaths) {
    return <p>No recent cases have been detected in the current country</p>
  } else {

    const lastUpdateFormatted = moment(lastUpdate).format("YYYY-MM-DD");

    return (
      <div className={cardsStyles.container}>
        <Grid container spacing={3} justify="center">
          <CardItem
            name="Infected"
            value={confirmed}
            description="Number of active cases of COVID-19"
            activeStyle={cardsStyles.active}
            lastUpdate={lastUpdateFormatted}
          />
          <CardItem
            name="Recovered"
            value={recovered}
            description="Number of recovered cases of COVID-19"
            activeStyle={cardsStyles.recovered}
            lastUpdate={lastUpdateFormatted}
          />
          <CardItem
            name="Deaths"
            value={deaths}
            description="Number of deaths caused by COVID-19"
            activeStyle={cardsStyles.deaths}
            lastUpdate={lastUpdateFormatted}
          />
        </Grid>
      </div>
    )
  }
}

export default Cards