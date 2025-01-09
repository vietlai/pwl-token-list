import fs from 'fs';

import test from 'ava';

import { Strategy, TokenInfo, TokenListProvider } from './tokenlist';

test('Token list is a valid json', async (t) => {
  t.notThrows(() => {
    const content = fs
      .readFileSync('./src/tokens/pulsewallet.tokenlist.json')
      .toString();
    JSON.parse(content.toString());
  });
});

test('Token list does not have duplicate entries', async (t) => {
  const list = await new TokenListProvider().resolve(Strategy.GitHub);
  list.getList().reduce((agg, item) => {
    if (agg.has(item.address)) {
      console.log(item.address);
    }

    t.false(agg.has(item.address));
    agg.set(item.address, item);
    return agg;
  }, new Map<string, TokenInfo>());
});
