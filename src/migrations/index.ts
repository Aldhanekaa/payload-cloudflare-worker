import * as migration_20260825_223245 from './20260825_223245';

export const migrations = [
  {
    up: migration_20260825_223245.up,
    down: migration_20260825_223245.down,
    name: '20260825_223245'
  },
];
