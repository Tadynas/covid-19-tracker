import React from 'react'
import { Grid } from '@material-ui/core'
import moment from 'moment'

import CardItem from '../CardItem/CardItem'
import cardsStyles from './Cards.module.sass'

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if(!confirmed) {
    return 'Loading...'
  } else {

    const lastUpdateFormatted = moment(lastUpdate).format("YYYY-MM-DD");

    return (
      <div className={cardsStyles.container}>
        <Grid container spacing={3} justify="center">
          <CardItem
            name="Infected"
            value={confirmed.value}
            description="Number of active cases of COVID-19"
            activeStyle={cardsStyles.active}
            lastUpdate={lastUpdateFormatted}
          />
          <CardItem
            name="Recovered"
            value={recovered.value}
            description="Number of recovered cases of COVID-19"
            activeStyle={cardsStyles.recovered}
            lastUpdate={lastUpdateFormatted}
          />
          <CardItem
            name="Deaths"
            value={deaths.value}
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