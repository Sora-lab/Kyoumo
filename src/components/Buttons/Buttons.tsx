import React from 'react';

interface IconButtonProps {
  inconName: string;
  colorClass: string;
  style?: {};
  onClick?: (e?:any)=>void;
}

interface ActionButtonProps {
  text: string;
  colorClass: string;
  style?: React.CSSProperties;
  onClick?: (e?:any)=>void;
}

export function IconButton(props:IconButtonProps) {
  const iconClassName = "material-icons " + props?.colorClass;
  const handleOnClick = props.onClick || undefined;
  return (
    <button 
      style={ props.style ? props.style : undefined } 
      className="no-border no-background"
      onClick={handleOnClick}
    >
      <i className={iconClassName}>{props.inconName}</i>
    </button>
  )
};

export function ActionButton(props:ActionButtonProps) {
  const handleOnClick = props.onClick || undefined;
  const classname = "no-border no-background " +  props.colorClass
  return (
    <button 
      style={ props.style ? props.style : undefined } 
      className={classname}
      onClick={handleOnClick}
    >
      {props.text}
    </button>
  )
};