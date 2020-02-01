import React from 'react';


export function NewItem(props:any) {

  return (
    <form className='new-item-form'>
      <fieldset>
        <input type="text" name="item-title" id="item-title" required></input>
        <label htmlFor='note'>Note: </label>
        <input type="text" name="item-note" id="item-note"></input>
        <div className="new-item-form">
          <input type="submit" value="Save" onSubmit={()=>props}/>
        </div>
      </fieldset>
    </form>
  )
}