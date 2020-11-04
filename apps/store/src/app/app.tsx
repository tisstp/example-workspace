import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Header } from '@example-workspace/store/ui-shared';
import { formatRating } from '@example-workspace/store/util-formatters';
import { StoreFeatureGameDetail } from '@example-workspace/store/feature-game-detail';
import { Game } from '@example-workspace/api/util-interfaces';

import './app.scss';

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
  const [state, setState] = useState<{
    data: Game[];
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: [],
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });
    fetch('api/games')
      .then((x) => x.json())
      .then((res) => {
        setState({
          ...state,
          data: res,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loadingState: 'error',
        });
      });
  }, []);

  const renderCard = ({ id, name, description, image, rating }: Game) => {
    return (
      <Grid key={id} item sm={4}>
        <Card
          className={classes.card}
          onClick={() => history.push(`/game/${id}`)}
        >
          <CardActionArea>
            <CardMedia className={classes.media} image={image} title={name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>Rating:</strong> {formatRating(rating)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  const renderContent = () => {
    const { loadingState, data } = state;
    if (loadingState === 'loading') {
      return 'Loading...';
    }

    if (loadingState === 'error') {
      return '<div>Error retrieving data</div>';
    }

    return data.map(renderCard);
  };

  return (
    <>
      <CssBaseline />

      <Header title="Example Workspace" />

      <Container data-testid="app-container">
        <Grid container justify="center" spacing={2} className={classes.root}>
          {renderContent()}
        </Grid>
      </Container>

      <Route path="/game/:id" component={StoreFeatureGameDetail} />
    </>
  );
};

export default App;
