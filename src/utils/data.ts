import { nanoid } from 'nanoid'
import bioHazards from '../data/data.json'

const COLUMN_NAMES = [
  'INGREDIENT NAME',
  'CATEGORY',
  'SUB CATEGORY',
  'BIOLOGICAL HAZARD',
  'HAZARD ADDRESSED BY SUPPLIER',
  'ACTION',
  'PROCESS',
  'MIN UNITS',
  'MAX UNITS',
  'DURATION',
  'INTERVAL',
  'ANALYZE',
] as const

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
type TDataSource = Record<Lowercase<typeof COLUMN_NAMES[number]>, any> & {
  key: string
}

const DATA_SOURCE: TDataSource[] = bioHazards.map((bioHazard, index) => {
  const id = nanoid()
  return {
    key: index.toString(),
    ingredient_id: bioHazard.IngredientId,
    category_id: bioHazard.RecipeCategoryId,
    'ingredient name': bioHazard.IngredientName,
    category: bioHazard.CategoryTitle,
    'sub category': bioHazard.RecipeSubCategoryTitle,
    'biological hazard': bioHazard.BiologicalHazardTitle,
    'hazard addressed by supplier': bioHazard.Status,
    action: 'action',
    process: '',
    'min units': 0,
    'max units': 0,
    duration: 0,
    interval: '',
    analyze: id,
  }
})
const PROCESS_SELECT_OPTIONS = [
  {
    value: 'Irradiation',
    label: 'Irradiation',
  },
  {
    value: 'Heat Treatment',
    label: 'Heat Treatment',
  },
  {
    value: 'Steam',
    label: 'Steam',
  },
  {
    value: 'Hot ethanol',
    label: 'Hot ethanol',
  },
  {
    value: 'Drying',
    label: 'Drying',
  },
  {
    value: 'Organic acids',
    label: 'Organic acids',
  },
  {
    value: 'Pasteurization',
    label: 'Pasteurization',
  },
]
const INTERVAL_SELECT_OPTIONS = [
  {
    value: 'hour',
    label: 'hour',
  },
  {
    value: 'minute',
    label: 'minute',
  },
  {
    value: 'second',
    label: 'second',
  },
]
export type { TDataSource }
export {
  COLUMN_NAMES,
  DATA_SOURCE,
  PROCESS_SELECT_OPTIONS,
  INTERVAL_SELECT_OPTIONS,
}
