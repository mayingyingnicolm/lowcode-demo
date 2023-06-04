import React from 'react';
import { PluginProps } from '@alilc/lowcode-types';
import { ProTable,EditTable } from '@alifd/fusion-ui';
import { Button } from '@alifd/next';
export interface IProps {
  logo?: string;
  href?: string;
}
function onClick(){
  console.log('onClick')
}
const MyComponentsList: React.FC<IProps & PluginProps> = (props): React.ReactElement => {
  let dataSource=[
    {
      "name": "查询组件",
      "id": "id-onl36m",
      "json": "{\"filterName\":\"name\"}"
    }
  ]
  let colomns=[
    {
      "title": "组件名称",
      "dataIndex": "name",
      "width": 160,
      "formatType": "text",
      "searchable": true
    },
    {
      "title": "json",
      "dataIndex": "json",
      "formatType": "text"
    }
  ]
  let actionColomnButtons={
    "dataSource": [
      {
        "children": "查看",
        "type": "primary",
        "onClick": {
          "type": "JSFunction",
          "value": "function(){ return this.onClickDetail.apply(this,Array.prototype.slice.call(arguments).concat([])) }"
        }
      },
      {
        "children": "编辑",
        "type": "primary",
        "disabled": false,
        "onClick": {
          "type": "JSFunction",
          "value": "function(){ return this.onClickSave.apply(this,Array.prototype.slice.call(arguments).concat([])) }"
        }
      },
      {
        "children": "删除",
        "type": "primary",
        "onClick": {
          "type": "JSFunction",
          "value": "function(){ return this.onClickDelete.apply(this,Array.prototype.slice.call(arguments).concat([])) }"
        }
      }
    ],
    "text": true,
    "visibleButtonCount": 4
  }
  return (
    <div>
      <EditTable columns={colomns} dataSource={dataSource}></EditTable>
      {/* <Button onClick={onClick}>fusion button</Button> */}
      {/* <ProTable columns={colomns} dataSource={dataSource} actionColumnButtons={actionColomnButtons}></ProTable> */}
    </div>
    
  );
};

export default MyComponentsList;
