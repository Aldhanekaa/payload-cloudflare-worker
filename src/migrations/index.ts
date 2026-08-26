import * as migration_20260826_120006 from './20260826_120006';
import * as migration_20260826_121241 from './20260826_121241';

export const migrations = [
  {
    up: migration_20260826_120006.up,
    down: migration_20260826_120006.down,
    name: '20260826_120006',
  },
  {
    up: migration_20260826_121241.up,
    down: migration_20260826_121241.down,
    name: '20260826_121241'
  },
];
