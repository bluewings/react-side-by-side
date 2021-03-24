import { createContext } from 'react';

export const LocalContext = createContext<{
  // schema: any
  // tokenDictionary: any
  // formatError: any
  [key: string]: any;
}>({
  // schema: null,
  // tokenDictionary: {},
  // formatError: null,
});
