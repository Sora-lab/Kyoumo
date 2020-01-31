import React from 'react';
interface Props{
  layout: string;
  leftIconOnClick: ()=>void;
}
export function AppBar(props: Props) {
	const today = new Date();
	if (props.layout === 'defalut') {
		return (
			<header className="primary white flex space-between" style={{ padding: '8px 12px', height: '29px' }}>
				<section>
					<button className="no-border no-background">
						<i className="material-icons white">menu</i>
					</button>
					<span style={{ verticalAlign: 'super', paddingLeft: '1rem' }}>{today.toLocaleDateString()}</span>
				</section>
				<section role="toolbar ">
					<button className="no-border no-background">
						<i className="material-icons white">search</i>
					</button>
				</section>
			</header>
		);
	} else {
    return (
			<header className="white flex space-between primary" style={{ padding: '8px 12px', height: '29px' }}>
				<section>
					<button className="no-border no-background" onClick={props.leftIconOnClick}>
						<i className="material-icons white">close</i>
					</button>
					<span style={{ verticalAlign: 'super', paddingLeft: '1rem' }}>{today.toLocaleDateString()}</span>
				</section>
				<section role="toolbar ">
					<button className="white no-border no-background">
						save
					</button>
				</section>
			</header>
    )
  }
}
