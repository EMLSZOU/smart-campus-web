import React, {Fragment, PureComponent} from 'react';
import DataTable from '@/components/SmartCampus/Table/DataTable';
import PropTypes from 'prop-types';
import appEnums from "../../../../config/enums"

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => [
  {
    title: '时间类型',
    dataIndex: 'dateType',
    width: '25%',
    render: (text, record) => {
      const week = [];
      appEnums.weekList.find(item => {
        if (text.includes(item.val)) {
          week.push(item.key);
          // 1-1 这种的数据
          if (text.startsWith(item.val) && text.endsWith(item.val)) {
            week.push(item.key);
          }
        }
      });
      return week.join(" ~ ");
    }
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    width: '15%',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    width: '15%',
  },
  {
    title: '描述',
    dataIndex: 'description',
  }
];

/**
 *  权限表格
 */
class TimeQuantumTable extends PureComponent {
  render() {
    const {dataSource, loading, height, selectedRowKeys, onTableSelectChange, onOperator} = this.props;

    const rowSelection = onTableSelectChange ? {
      columnTitle: '选择',
      columnWidth: 80,
      selectedRowKeys,
      onChange: onTableSelectChange,
    } : null;

    // 表格参数
    const dataTableProps = {
      rowKey: 'id',
      rowSelection,
      dataSource,
      loading,
      height,
      columns: tableColumns(onOperator),
      pagination: false,
    };

    return <DataTable {...dataTableProps} />;
  }
}

TimeQuantumTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
TimeQuantumTable.defaultProps = {};

export default TimeQuantumTable;
