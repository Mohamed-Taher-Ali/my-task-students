import React from 'react';
import { Collapse } from 'antd';


const MyAccordion = ({
  defaultActiveKey = 0,
  onChange = () => { },
  dataArray = [],
}) => {
  const onChangeHandler = (key) => onChange(key);

  return (
    <Collapse defaultActiveKey={`${defaultActiveKey}`} onChange={onChangeHandler}>
      {
        dataArray.map((d, i) => {
          const { body, ...props } = d;

          return (
            <Collapse.Panel style={{backgroundColor: '#001529', color:'white'}} key={`${i}`} {...props}>
              {body}
            </Collapse.Panel>
          );
        })
      }
    </Collapse>
  );
};

export default MyAccordion;