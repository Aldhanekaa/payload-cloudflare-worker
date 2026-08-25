import type { Field, TabsField } from 'payload'

/**
 * Recursively traverse fields and add the LocalizeFieldButton afterInput component
 * to any field that has `localized: true`.
 */
export function addLocalizationToFields(
  fields: Field[],
  parentPath = '',
): Field[] {
  return fields.map((field): Field => {
    // Handle tabs field
    if (field.type === 'tabs') {
      return {
        ...field,
        tabs: (field as TabsField).tabs.map((tab) => ({
          ...tab,
          fields: addLocalizationToFields(tab.fields, parentPath),
        })),
      } as TabsField
    }

    // Handle group / array / row / collapsible — recurse into nested fields
    if (
      (field.type === 'group' ||
        field.type === 'array' ||
        field.type === 'row' ||
        field.type === 'collapsible') &&
      'fields' in field &&
      Array.isArray((field as any).fields)
    ) {
      const nested = (field as any).fields as Field[]
      const nestedPath =
        'name' in field && field.name
          ? parentPath
            ? `${parentPath}.${field.name}`
            : field.name
          : parentPath

      return {
        ...field,
        fields: addLocalizationToFields(nested, nestedPath),
      } as Field
    }

    // Skip unnamed / UI fields
    if (!('name' in field) || !field.name) return field

    // Only decorate localized named fields
    if (!(field as any).localized) return field

    const fieldPath = parentPath ? `${parentPath}.${field.name}` : field.name
    const fieldLabel =
      typeof (field as any).label === 'string'
        ? (field as any).label
        : field.name

    return {
      ...field,
      admin: {
        ...(field as any).admin,
        components: {
          ...(field as any).admin?.components,
          afterInput: [
            ...((field as any).admin?.components?.afterInput ?? []),
            {
              path: '@/(payload)/plugins/localization/components/LocalizeFieldButton#LocalizeFieldButton',
              clientProps: {
                fieldName: field.name,
                fieldLabel,
                fieldPath,
              },
            },
          ],
        },
      },
    } as Field
  })
}
