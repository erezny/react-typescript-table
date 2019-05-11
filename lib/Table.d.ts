import * as React from 'react';
export declare type UniqueDataType = {
    id: string | number;
};
export declare type Props<RowDataType, OtherColumns> = {
    data: Array<RowDataType>;
    columns?: Array<ColumnDescription<RowDataType, OtherColumns>>;
    minimumRowCount?: number;
    tableClassName?: string;
    trAttributes?: React.HTMLProps<HTMLTableRowElement>;
    trClassName?: (row: RowDataType) => string;
};
export declare type ColumnDescription<RowDataType, OtherColumns> = ColumnDescriptor<RowDataType, keyof RowDataType> | OtherColumnDescriptor<RowDataType, keyof OtherColumns>;
export declare type ColumnDescriptor<RowDataType, AttributeKey extends keyof RowDataType> = {
    key: AttributeKey;
    title?: string | React.ReactNode;
    tdClassName?: string;
    format?: (value: RowDataType) => React.ReactText | React.ReactNode;
};
export declare type OtherColumnDescriptor<RowDataType, OtherColumnKeys> = {
    key: OtherColumnKeys;
    title?: string | React.ReactNode;
    tdClassName?: string;
    format: (value: RowDataType) => React.ReactText | React.ReactNode;
};
export declare function getColumnTitle<RowDataType, OtherColumns>(column: ColumnDescription<RowDataType, OtherColumns>): React.ReactElement<'th'>;
export default class Table<RowDataType extends UniqueDataType, OtherColumns> extends React.Component<Props<RowDataType, OtherColumns>> {
    isColumnDescriptor: (value: ColumnDescription<RowDataType, OtherColumns>) => value is ColumnDescriptor<RowDataType, keyof RowDataType>;
    readonly columnTitles: Array<React.ReactElement<'th'>>;
    getFormattedColumn: (column: ColumnDescription<RowDataType, OtherColumns>, row: RowDataType) => React.ReactElement<"td", string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    rowColumns: (row: RowDataType) => React.ReactElement<"td", string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    formatRow: (row: RowDataType, trAttributes?: React.HTMLProps<HTMLTableRowElement> | undefined, trClassName?: ((row: RowDataType) => string) | undefined) => React.ReactElement<"tr", string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    readonly rows: Array<React.ReactElement<'tr'>>;
    render(): JSX.Element;
}
