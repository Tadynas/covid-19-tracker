import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import cx from 'classnames'

import cardStyles from './CardItem.module.sass'

const CardItem = ({ name, value, description, activeStyle, lastUpdate }) => {

  return (
    <Grid item component={Card} xs={12} md={3} className={cx(cardStyles.card, activeStyle)}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>{name}</Typography>
        <Typography variant="h5">
          <CountUp 
            start={0}
            end={value}
            duration={0.5}
            separator=" "
          />
        </Typography>
        <Typography color="textSecondary">{lastUpdate}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Grid>
  )
}

export default CardItem
