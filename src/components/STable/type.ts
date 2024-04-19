import type { TableColumnType } from 'ant-design-vue'

export interface STableProps {
  rowKey: ((row: any) => string) | string
  columns: TableColumnType[]
  pageSizeOptions?: string[]
  rowSelection?: any
  scroll?: any
  data: (currentPage: number, pageSize: number) => any
}

export type Columns = TableColumnType[]
