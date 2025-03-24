export interface EntityField {
  name: string
  label: string
  placeholder?: string
  type?: "text" | "number" | "select" | "textarea" | "icon"
  required?: boolean
  options?: { value: string; label: string }[]
}

export interface EntityConfig<T> {
  name: string
  namePlural: string
  fields: EntityField[]
  getDisplayName: (item: T) => string
  getIdField: (item: T) => number
  emptyState: Partial<T>
}

