import * as migration_20260826_020709 from './20260826_020709';

export const migrations = [
  {
    up: migration_20260826_020709.up,
    down: migration_20260826_020709.down,
    name: '20260826_020709'
  },
];
