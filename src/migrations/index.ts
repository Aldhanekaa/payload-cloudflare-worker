import * as migration_20260825_215052 from './20260825_215052';

export const migrations = [
  {
    up: migration_20260825_215052.up,
    down: migration_20260825_215052.down,
    name: '20260825_215052'
  },
];
