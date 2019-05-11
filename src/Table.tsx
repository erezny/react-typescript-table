import * as React from 'react'
import { titleCase } from 'change-case'

export type UniqueDataType = {
  id: string | number
}

export type Props<RowDataType, OtherColumns> = {
  data: Array<RowDataType>
  columns?: Array<ColumnDescription<RowDataType, OtherColumns>>
  minimumRowCount?: number
  tableClassName?: string
  trAttributes?: React.HTMLProps<HTMLTableRowElement>
  trClassName?: (row: RowDataType) => string
}

export type ColumnDescription<RowDataType, OtherColumns> =
  | ColumnDescriptor<RowDataType, keyof RowDataType>
  | OtherColumnDescriptor<RowDataType, keyof OtherColumns>

export type ColumnDescriptor<RowDataType, AttributeKey extends keyof RowDataType> = {
  key: AttributeKey
  title?: string | React.ReactNode
  tdClassName?: string
  format?: (value: RowDataType) => React.ReactText | React.ReactNode
}

export type OtherColumnDescriptor<RowDataType, OtherColumnKeys> = {
  key: OtherColumnKeys
  title?: string | React.ReactNode
  tdClassName?: string
  format: (value: RowDataType) => React.ReactText | React.ReactNode
}

function defaultTitle(key: any): string {
  return titleCase(`${key}`)
}

export function getColumnTitle<RowDataType, OtherColumns>(
  column: ColumnDescription<RowDataType, OtherColumns>
): React.ReactElement<'th'> {
  const title = column.title === undefined ? defaultTitle(column.key) : column.title

  return <th key={`${column.key}`}>{title}</th>
}

function defaultFormat(value: any): string {
  if (value === null || value === undefined) {
    return ''
  }
  return `${value}`
}

export default class Table<
  RowDataType extends UniqueDataType,
  OtherColumns
> extends React.Component<Props<RowDataType, OtherColumns>> {
  isColumnDescriptor = (
    value: ColumnDescription<RowDataType, OtherColumns>
  ): value is ColumnDescriptor<RowDataType, keyof RowDataType> => {
    return this.props.data[0].hasOwnProperty(value.key)
  }

  get columnTitles(): Array<React.ReactElement<'th'>> {
    if (this.props.columns == undefined && this.props.data.length === 0) {
      return []
    }
    if (this.props.columns == undefined) {
      return Object.keys(this.props.data[0]).map(key => <th key={`${key}`}>{defaultTitle(key)}</th>)
    } else {
      return this.props.columns.map(getColumnTitle)
    }
  }

  getFormattedColumn = (
    column: ColumnDescription<RowDataType, OtherColumns>,
    row: RowDataType
  ): React.ReactElement<'td'> => {
    const title = this.isColumnDescriptor(column)
      ? !!column.format
        ? column.format(row)
        : defaultFormat(row[column.key])
      : column.format(row)
    const tdClassName = column.tdClassName || ''
    return (
      <td className={tdClassName} key={`${column.key}`}>
        {title}
      </td>
    )
  }

  rowColumns = (row: RowDataType): Array<React.ReactElement<'td'>> => {
    if (this.props.columns == undefined && this.props.data.length === 0) {
      return []
    }
    if (this.props.columns == undefined) {
      return Object.entries(row).map(([key, value]: [string, any]) => (
        <td key={`${key}`}>{defaultFormat(value)}</td>
      ))
    } else {
      return this.props.columns.map((column: ColumnDescription<RowDataType, OtherColumns>) =>
        this.getFormattedColumn(column, row)
      )
    }
  }

  formatRow = (
    row: RowDataType,
    trAttributes?: React.HTMLProps<HTMLTableRowElement>,
    trClassName?: (row: RowDataType) => string
  ): React.ReactElement<'tr'> => {
    return (
      <tr
        data-key={row.id}
        key={`${row.id}`}
        {...trAttributes}
        className={trClassName ? trClassName(row) : ''}
      >
        {this.rowColumns(row)}
      </tr>
    )
  }

  get rows(): Array<React.ReactElement<'tr'>> {
    return this.props.data.map((value: RowDataType) => {
        return this.formatRow(value, this.props.trAttributes, this.props.trClassName)
      })
  }

  render() {
    return (
      <table className={this.props.tableClassName}>
        <thead>
          <tr>{this.columnTitles}</tr>
        </thead>
        <tbody>{this.rows}</tbody>
      </table>
    )
  }
}
