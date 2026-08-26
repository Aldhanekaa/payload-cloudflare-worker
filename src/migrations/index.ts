import * as migration_20260826_021421 from './20260826_021421';

export const migrations = [
  {
    up: migration_20260826_021421.up,
    down: migration_20260826_021421.down,
    name: '20260826_021421'
  },
];
