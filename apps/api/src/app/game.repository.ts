import { Game } from '@example-workspace/api/util-interfaces';

const games: Game[] = [
  {
    id: 'game-1',
    name: 'Game 1',
    image: '/assets/game1.png',
    description: 'description of game 1',
    rating: Math.random(),
  },
  {
    id: 'game-2',
    name: 'Game 2',
    image: '/assets/game2.png',
    description: 'description of game 2',
    rating: Math.random(),
  },
  {
    id: 'game-3',
    name: 'Game 3',
    image: '/assets/game3.png',
    description: 'description of game 3',
    rating: Math.random(),
  },
];

export const getAllGames = () => games;
export const getGame = (id) => games.find((item) => item.id === id);
