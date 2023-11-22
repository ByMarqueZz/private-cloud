import { render, screen } from '@testing-library/react';
import { url } from './App';

test('comprobar el valor de la URL', () => {
  expect(url).toEqual('https://cloudinghub.com:8282');
});