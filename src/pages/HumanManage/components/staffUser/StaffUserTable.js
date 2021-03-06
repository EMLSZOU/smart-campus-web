import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import DataTable from "../../../../components/SmartCampus/Table/DataTable";
import enums from "../../config/enums";

/**
 *  表格列
 * @returns {*[]}
 */
const tableColumns = onOperator => {
  const columns = [
    {
      title: '用户组',
      dataIndex: 'groupName',
      width: '25%',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
    },
    {
      title: '用户类型',
      dataIndex: 'userType',
      width: '8%',
      render: (text, record) => enums.UserTypes[text] || "",
    },
    {
      title: '身份证',
      dataIndex: 'userIdentity',
      width: '15%',
    },
  ];
  if (onOperator) {
    columns.push({
      title: '操作',
      width: '10%',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => onOperator(record)}>详情</a>
        </Fragment>
      ),
    })
  }
  return columns;
};

/**
 *  权限表格
 */
class StaffUserTable extends PureComponent {


  render() {
    const {
      height,
      dataSource,
      total,
      current,
      pageSize,
      loading,
      selectedRowKeys,
      onTableSelectChange,
      onTablePageChange,
      onShowSizeChange,
      onRowCheck,
      onOperator
    } = this.props;

    const rowSelection = {
      columnTitle: '选择',
      columnWidth: 60,
      selectedRowKeys,
      onChange: onTableSelectChange,
    };

    const onRow = (record) => {
      return {
        onClick: event => onRowCheck && onRowCheck(record), // 点击行
      }
    };

    // 表格参数
    const dataTableProps = {
      height,
      rowKey: 'id',
      pagination: true,
      rowSelection,
      dataSource,
      loading,
      columns: tableColumns(onOperator),
      total,
      current,
      pageSize,
      onTablePageChange,
      onShowSizeChange,
      onRow
    };

    return <DataTable {...dataTableProps} />;
  }
}

StaffUserTable.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  selectedRowKeys: PropTypes.array,
  onTableSelectChange: PropTypes.func,
  onOperator: PropTypes.func,
};
StaffUserTable.defaultProps = {};

export default StaffUserTable;
