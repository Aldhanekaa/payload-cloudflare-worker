import * as migration_20260826_151211 from './20260826_151211';

export const migrations = [
  {
    up: migration_20260826_151211.up,
    down: migration_20260826_151211.down,
    name: '20260826_151211'
  },
];
