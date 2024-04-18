import type { TableColumnType } from 'ant-design-vue'

export interface STableProps {
  columns: TableColumnType[]
  rowSelection: any
  data: (currentPage: number, pageSize: number) => any
  pageSizeOptions: string[]
  rowKey: ((row: any) => string) | string
  scroll?: any
}
