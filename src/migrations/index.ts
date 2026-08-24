import * as migration_20250929_111647 from './20250929_111647'
import * as migration_20260803_070913 from './20260803_070913'
import * as migration_20260821_seed_property_types from './20260821_seed_property_types'

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260803_070913.up,
    down: migration_20260803_070913.down,
    name: '20260803_070913',
  },
  {
    up: migration_20260821_seed_property_types.up,
    down: migration_20260821_seed_property_types.down,
    name: '20260821_seed_property_types',
  },
]
