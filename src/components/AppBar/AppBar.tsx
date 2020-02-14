import React from 'react';

// components
import { IconButton, ActionButton } from '../Buttons/Buttons';

// interfaces
import {Layout} from '../pages/Container';

interface Props {
  layout: Layout;
  leftIconOnClick: (e?: any) => void;
  rightIconsOnClick: (e?: any) => void;
  farRightIconsOnClick: (e?: any) => void;
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
    <IconButton style={buttonStyle} inconName='menu' colorClass='black' onClick={() => props.leftIconOnClick()} />
  );
  const closeButton = (
    <IconButton style={buttonStyle} inconName='close' colorClass='black' onClick={() => props.leftIconOnClick()} />
  );

  // Right section layout
  // - Default
  // - Form
  const defaultToolbar = (
    <>
      <IconButton inconName='search' colorClass='black' />
      <IconButton inconName='more_vert' colorClass='black' />
    </>
  );
  
  // TODO: this onclick has to get form elements and 
  // trigger create function from CRUD
  // and close the form
  const formToolBar = (
    <ActionButton colorClass="black" text="SAVE" onClick={(e: any) => props.rightIconsOnClick(e)} />
  );
  

  // chose sections accordingly
  if (props.layout === Layout.default) {
    toolbar = defaultToolbar;
    menuIcon = hamburgerButton;
  } else {
    toolbar = formToolBar;
    menuIcon = closeButton;
  }

  return (
    <header
      className="flex align-items-center space-between"
      style={{ padding: '8px 12px', height: '45px', alignItems: 'center', marginBottom: '8px', borderBottom: '#dadce0 1px solid' }}
    >
      <section className="flex align-items-center">
        {menuIcon}
        <span style={{ paddingLeft: '1rem' }}>{'My List '}{today.toLocaleDateString()}</span>
      </section>
      <section role="toolbar ">
        {toolbar}
      </section>
    </header>
  );
}
