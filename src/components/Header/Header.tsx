import React from 'react';


export function Header(){
    const today = new Date();
    return(
        <header className='app-header'>
            <span>{today.toLocaleDateString()}</span>
        </header>
    )
}



