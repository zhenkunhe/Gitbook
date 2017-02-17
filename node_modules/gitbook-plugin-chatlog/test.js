import test from 'ava';
import fn from './';

test('load', t => {
  t.true(fn.book.assets === './book');
});
