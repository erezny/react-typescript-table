"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var change_case_1 = require("change-case");
function defaultTitle(key) {
    return change_case_1.titleCase("" + key);
}
function getColumnTitle(column) {
    var title = column.title === undefined ? defaultTitle(column.key) : column.title;
    return React.createElement("th", { key: "" + column.key }, title);
}
exports.getColumnTitle = getColumnTitle;
function defaultFormat(value) {
    if (value === null || value === undefined) {
        return '';
    }
    return "" + value;
}
var Table = (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isColumnDescriptor = function (value) {
            return _this.props.data[0].hasOwnProperty(value.key);
        };
        _this.getFormattedColumn = function (column, row) {
            var title = _this.isColumnDescriptor(column)
                ? !!column.format
                    ? column.format(row)
                    : defaultFormat(row[column.key])
                : column.format(row);
            var tdClassName = column.tdClassName || '';
            return (React.createElement("td", { className: tdClassName, key: "" + column.key }, title));
        };
        _this.rowColumns = function (row) {
            if (_this.props.columns == undefined && _this.props.data.length === 0) {
                return [];
            }
            if (_this.props.columns == undefined) {
                return Object.entries(row).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return (React.createElement("td", { key: "" + key }, defaultFormat(value)));
                });
            }
            else {
                return _this.props.columns.map(function (column) {
                    return _this.getFormattedColumn(column, row);
                });
            }
        };
        _this.formatRow = function (row, trAttributes, trClassName) {
            return (React.createElement("tr", __assign({ "data-key": row.id, key: "" + row.id }, trAttributes, { className: trClassName ? trClassName(row) : '' }), _this.rowColumns(row)));
        };
        return _this;
    }
    Object.defineProperty(Table.prototype, "columnTitles", {
        get: function () {
            if (this.props.columns == undefined && this.props.data.length === 0) {
                return [];
            }
            if (this.props.columns == undefined) {
                return Object.keys(this.props.data[0]).map(function (key) { return React.createElement("th", { key: "" + key }, defaultTitle(key)); });
            }
            else {
                return this.props.columns.map(getColumnTitle);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "rows", {
        get: function () {
            var _this = this;
            return this.props.data.map(function (value) {
                return _this.formatRow(value, _this.props.trAttributes, _this.props.trClassName);
            });
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.render = function () {
        return (React.createElement("table", { className: this.props.tableClassName },
            React.createElement("thead", null,
                React.createElement("tr", null, this.columnTitles)),
            React.createElement("tbody", null, this.rows)));
    };
    return Table;
}(React.Component));
exports.default = Table;
//# sourceMappingURL=Table.js.map