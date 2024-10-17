import { betReducer } from './betReducer';
import { initialGames } from '@/consts/game';
import { BetAction, Game } from '@/models/game';

describe('betReducer', () => {
  let state: Game[];

  beforeEach(() => {
    state = [...initialGames];
  });

  test('should handle PLACE_BET for team A', () => {
    const action: BetAction = {
      type: 'PLACE_BET',
      gameId: state[0].id,
      team: 'A',
      amount: 10,
    };

    const newState = betReducer(state, action);

    expect(newState[0].betsA).toBe(state[0].betsA + 10);
    expect(newState[0].betsB).toBe(state[0].betsB);
  });

  test('should handle PLACE_BET for team B', () => {
    const action: BetAction = {
      type: 'PLACE_BET',
      gameId: state[1].id,
      team: 'B',
      amount: 20,
    };

    const newState = betReducer(state, action);

    expect(newState[1].betsB).toBe(state[1].betsB + 20);
    expect(newState[1].betsA).toBe(state[1].betsA);
  });

  test('should handle RESET action', () => {
    const modifiedState = betReducer(state, {
      type: 'PLACE_BET',
      gameId: state[0].id,
      team: 'A',
      amount: 100,
    });

    const newState = betReducer(modifiedState, { type: 'RESET' });

    expect(newState).toEqual(initialGames);
  });

  test('should return the current state for unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION' } as unknown as BetAction;

    const newState = betReducer(state, action);

    expect(newState).toEqual(state);
  });
});