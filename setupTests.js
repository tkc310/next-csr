import '@testing-library/jest-dom/extend-expect';
import { initTestHelpers } from 'next-page-tester';
// @see https://stackoverflow.com/questions/50688998/using-apolloclient-with-node-js-fetch-is-not-found-globally-and-no-fetcher-pas
import 'cross-fetch/polyfill';

initTestHelpers();
