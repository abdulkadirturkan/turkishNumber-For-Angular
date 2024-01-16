import { TurkishNumberPipe } from './turkish-number.pipe';

describe('TurkishNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new TurkishNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
