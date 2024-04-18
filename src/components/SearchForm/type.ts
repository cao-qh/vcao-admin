export interface SearchFormProps {
  searchLoading: boolean
  formItems: FormItems
}

interface FormItem {
  filed: string
  label: string
  type: string
  placeholder: string
  value: string | number
}

export type FormItems = FormItem[]
