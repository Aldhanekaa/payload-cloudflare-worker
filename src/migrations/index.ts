import * as migration_20260825_095506 from './20260825_095506';

export const migrations = [
  {
    up: migration_20260825_095506.up,
    down: migration_20260825_095506.down,
    name: '20260825_095506'
  },
];
