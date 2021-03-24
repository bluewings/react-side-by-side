import React, { useState } from 'react';

import { Button } from './Button';
import SideBySide from '../components/SideBySide';
import SideBySideItem from '../components/SideBySideItem';

export default {
  title: 'Example/SideBySide',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

export const grid = () => {

  return (
    <div>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <div style={{ border: '1px solid red' }}>
        <SideBySide offsetTop={100}>
          <div style={{ margin: '0 1rem' }}>
            <SideBySide.Item>
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={3} />
              <Block size={2} />
            </SideBySide.Item>
          </div>
          <div style={{ margin: '0 1rem' }}>
            <div style={{ position: 'sticky', top: 100 }}>
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={3} />
              <Block size={2} />
            </div>
          </div>
          <div style={{ margin: '0 1rem' }}>
            <SideBySideItem>
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
            </SideBySideItem>
          </div>
          <div style={{ margin: '0 1rem' }}>
            <SideBySideItem>
              <Block size={3} />
              <Block size={2} />
              <Block size={4} />
              <Block size={1} />
              {/* <Block size={3} />
            <Block size={2} />
            <Block size={4} />
            <Block size={1} />
            <Block size={4} />
            <Block size={1} /> */}
            </SideBySideItem>
          </div>
          <div style={{ margin: '0 1rem' }}>
            <SideBySideItem>
              <Block size={1} />
              <Block size={5} />
              <Block size={3} />
              <Block size={1} />
              <Block size={5} />
              <Block size={1} />
              <Block size={2} />
              <Block size={5} />
              <Block size={1} />
              <Block size={2} />
            </SideBySideItem>
          </div>
        </SideBySide>
      </div>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>
      <h1 style={{ display: 'block', fontSize: 60 }}>hi there</h1>


      {/* <Form schema={schema} form={grid} formTypes={formTypes} /> */}
    </div>
  );
};


function Block(props) {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    setShow(false);
  }
  console.log('--')
  return (
    <div style={{
      width: 150, height: props.size * 50,
      border: '1px solid blue',
      boxSizing: 'border-box',
      display: show ? 'block' : 'none',
    }} onClick={handleClick}>
      <h4>{props.size}</h4>
    </div>
  )
}


// export const Primary = Template.bind({});
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
