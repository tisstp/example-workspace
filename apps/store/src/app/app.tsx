import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Header } from '@example-workspace/store/ui-shared';
import { formatRating } from '@example-workspace/store/util-formatters';
import { StoreFeatureGameDetail } from '@example-workspace/store/feature-game-detail';

import './app.scss';

import { getAllGames } from '../fake-api';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const App = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <CssBaseline />

      <Header />

      <Grid container justify="center" spacing={2} className={classes.root}>
        {getAllGames().map((x) => (
          <Grid key={x.id} item>
            <Card
              className={classes.card}
              onClick={() => history.push(`/game/${x.id}`)}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={x.image}
                  title={x.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {x.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {x.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <strong>Rating:</strong> {formatRating(x.rating)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </>
  );
};

export default App;
