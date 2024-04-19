export interface SearchFormProps {
  searchLoading: boolean
  formItems: FormItems
}

interface FormItem {
  filed: string
  label: string
  type: string
  placeholder: string
  value: string | number | null
  options?: SelectOption[]
}

export type FormItems = FormItem[]

type SelectOption = {
  label: string
  value: string | number
}
