import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import { formatRating } from '@example-workspace/store/util-formatters';
import { Game } from '@example-workspace/api/util-interfaces';

import './store-feature-game-detail.scss';

type TParams = { id: string };

const useStyles = makeStyles({
  root: {
    marginTop: 30,
  },
});

/* eslint-disable-next-line */
export interface StoreFeatureGameDetailProps
  extends RouteComponentProps<TParams> {}

export const StoreFeatureGameDetail = (props: StoreFeatureGameDetailProps) => {
  const classes = useStyles();
  const [state, setState] = useState<{
    data: Game;
    loadingState: 'success' | 'error' | 'loading';
  }>({
    data: {} as Game,
    loadingState: 'success',
  });

  useEffect(() => {
    setState({
      ...state,
      loadingState: 'loading',
    });

    const gameId = props.match.params.id;
    fetch(`api/games/${gameId}`)
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
  }, [props.match.params.id]);

  const renderContent = () => {
    const { loadingState, data } = state;
    if (loadingState === 'loading') {
      return 'Loading...';
    }

    if (loadingState === 'error') {
      return '<div>Error retrieving data</div>';
    }

    if (data == null) {
      return '';
    }

    return (
      <Card>
        <CardActionArea>
          <CardMedia image={state.data.image} title={state.data.name} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {state.data.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>Rating:</strong> {formatRating(state.data.rating)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return <Container className={classes.root}>{renderContent()}</Container>;
};

export default StoreFeatureGameDetail;
