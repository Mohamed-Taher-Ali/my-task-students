import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space } from 'antd';


const MyDropdown = ({
  onChange = () => { },
  dataArray = [],
  selectedWord = 'Select'
}) => {
  const [selected, setSelected] = useState(selectedWord);

  useEffect(() => {
    const defaultSelectedWord = selectedWord || (dataArray.length && dataArray[0]);
    setSelected(defaultSelectedWord);
  }, [dataArray])

  const onClick = (selectedWord) => () => {
    setSelected(selectedWord);
    onChange(selectedWord);
  }

  const roleMenu = (
    <Menu>
      {
        dataArray.map((d, i) => (
          <Menu.Item

            key={i}
            onClick={onClick(d)}
          >{d}</Menu.Item>
        ))
      }
    </Menu>
  );

  return (
    <Dropdown
      overlay={roleMenu}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button>
        <Space>
          {selected}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};


export default MyDropdown;