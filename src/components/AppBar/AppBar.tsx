import React from 'react';
import { IconButton, ActionButton } from '../Buttons/Buttons';

interface Props {
  layout: string;
  leftIconOnClick: (e?:any) => void;
  rightIconsOnClick: (e?:any) => void;
}
export function AppBar(props: Props) {
  const today = new Date();
  let toolbar: JSX.Element = <></>;
  let menuIcon: JSX.Element = <></>;

  //  Left side menu buttons
  // - hamburger
  // - close X 
  const buttonStyle: React.CSSProperties = { marginTop: '3px' }
  const hamburgerButton = (
    <IconButton style={buttonStyle} inconName='menu' colorClass='white' onClick={() => props.leftIconOnClick()} />
  );
  const closeButton = (
    <IconButton style={buttonStyle} inconName='close' colorClass='white' onClick={() => props.leftIconOnClick()} />
  );

  // Right section layout
  // - Default
  // - Form
  const defaultToolbar = (
    <>
      <IconButton inconName='search' colorClass='white' />
      <IconButton inconName='more_vert' colorClass='white' />
    </>
  );

  const formToolBar = (
    <ActionButton colorClass="white" text="SAVE" onClick={(e:any) => props.rightIconsOnClick(e)}/>
  );


  // chose sections accordingly
  if (props.layout === 'defalut') {
    toolbar = defaultToolbar;
    menuIcon = hamburgerButton;
  } else {
    toolbar = formToolBar;
    menuIcon = closeButton;
  }

  return (
    <header
      className="shadow primary white flex align-items-center space-between"
      style={{ padding: '8px 12px', height: '29px', alignItems: 'center' }}
    >
      <section className="flex align-items-center">
        {menuIcon}
        <span style={{ paddingLeft: '1rem' }}>{today.toLocaleDateString()}</span>
      </section>
      <section role="toolbar ">
        {toolbar}
      </section>
    </header>
  );
}
