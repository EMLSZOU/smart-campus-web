import React, {PureComponent} from 'react';
import {Form, Input, Modal} from "antd";
import PropTypes from "prop-types";
import enums from "@/pages/HumanManage/config/enums";
import {modalWidth} from '@/utils/utils';

const {TextArea} = Input;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 6},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};

@Form.create()
class StaffUserModal extends PureComponent {

  /**
   *  提交数据
   * @param onOk
   */
  onSubmit = (onOk) => {
    const {form: {validateFields}, openType, dataSource, pDataSource} = this.props;
    const {id} = (dataSource || {});
    const {pid} = (pDataSource || {});
    validateFields((errors, values) => {
      if (errors === null) {
        values.id = id;
        values.pid = pid;
        onOk && onOk(values, openType);
      }
    });
  };

  render() {
    const {
      visible,
      openType,
      dataSource,
      onOk,
      onCancel,
      form: {
        getFieldDecorator
      }
    } = this.props;

    const {groupName, groupCode, description} = dataSource;

    return <Modal
      title={enums.OperatorType[openType]}
      destroyOnClose={true}
      visible={visible}
      onOk={() => this.onSubmit(onOk)}
      width={modalWidth(window.innerWidth * 0.5)}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
    >
      <Form>
        <Form.Item {...formItemLayout} label="分组名称">
          {getFieldDecorator('groupName', {
            initialValue: groupName,
            rules: [
              {
                required: true,
                message: '分组名称必填',
              },
              {
                max: 64,
                message: '长度不能超过64',
              },
            ],
          })(<Input disabled={openType === 'view'}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="分组编码">
          {getFieldDecorator('groupCode', {
            initialValue: groupCode,
            rules: [
              {
                required: true,
                message: '分组编码必填',
              },
              {
                max: 64,
                message: '长度不能超过64',
              },
            ],
          })(<Input disabled={openType === 'view'}/>)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="描述">
          {getFieldDecorator('description', {
            initialValue: description,
            rules: [
              {
                max: 525,
                message: '长度不能超过525',
              },
            ]
          })(<TextArea disabled={openType === 'view'} rows={4}/>)}
        </Form.Item>
      </Form>
    </Modal>;
  }
}


StaffUserModal.propTypes = {
  // 是否显示
  visible: PropTypes.bool.isRequired,
  // 操作类型 edit  add
  openType: PropTypes.string,
  // 回显的数据
  dataSource: PropTypes.object,
  // 父节点数据
  pDataSource: PropTypes.object,
  // 确认方法
  onOk: PropTypes.func,
  // 取消方法
  onCancel: PropTypes.func,
};

StaffUserModal.defaultProps = {};

export default StaffUserModal;


