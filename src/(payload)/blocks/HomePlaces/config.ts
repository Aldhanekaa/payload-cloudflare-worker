import { colorPickerField } from '@/(payload)/plugins/colorPicker'
import type { Block } from 'payload'

export const HomePlaces: Block = {
  slug: 'homePlaces',
  interfaceName: 'HomePlacesBlock',
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Locations We Cover',
    },
    {
      name: 'propertiesLabel',
      type: 'text',
      defaultValue: 'Properties',
    },
    {
      name: 'exploreLocationLabel',
      type: 'text',
      defaultValue: 'Explore Location',
    },
    {
      name: 'dataSource',
      type: 'select',
      required: true,
      defaultValue: 'auto',
      options: [
        {
          label: 'Auto Query (All Cities)',
          value: 'auto',
        },
        {
          label: 'Manual Selection',
          value: 'manual',
        },
      ],
    },
    {
      name: 'cities',
      type: 'relationship',
      relationTo: 'cities',
      hasMany: true,
      admin: {
        condition: (data) => data.dataSource === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 100,
      min: 1,
      admin: {
        condition: (data) => data.dataSource === 'auto',
      },
    },
    colorPickerField({
      name: 'backgroundColor',
      label: 'Background Color',
      defaultValue: '#f7f5f0',
    }),
    colorPickerField({
      name: 'titleColor',
      label: 'Title Color',
      defaultValue: '#0a0a0a',
    }),
    colorPickerField({
      name: 'cityNameColor',
      label: 'City Name Color',
      defaultValue: '#ffffff',
    }),
    colorPickerField({
      name: 'propertiesCountColor',
      label: 'Properties Count Color',
      defaultValue: 'rgba(255,255,255,0.55)',
    }),
    colorPickerField({
      name: 'descriptionColor',
      label: 'Description Color',
      defaultValue: 'rgba(255,255,255,0.75)',
    }),
    colorPickerField({
      name: 'exploreLocationColor',
      label: 'Explore Location Link Color',
      defaultValue: '#b89a5b',
    }),
    colorPickerField({
      name: 'cardOverlayColor',
      label: 'Card Overlay Color (rgba)',
      defaultValue: 'rgba(10,10,10,0.6)',
    }),
  ],
}
