import * as migration_20260825_123132 from './20260825_123132';

export const migrations = [
  {
    up: migration_20260825_123132.up,
    down: migration_20260825_123132.down,
    name: '20260825_123132'
  },
];
