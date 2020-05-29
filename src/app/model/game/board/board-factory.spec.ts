import { BoardFactory } from './board-factory';

describe('BoardFactory', () => {
  it('should create an instance', () => {
    expect(new BoardFactory()).toBeTruthy();
  });
});
