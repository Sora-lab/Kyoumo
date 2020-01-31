import React from 'react';
interface Props {
	layout: string;
	leftIconOnClick: () => void;
}
export function AppBar(props: Props) {
	const today = new Date();
	if (props.layout === 'defalut') {
		return (
			<header
				className="shadow primary white flex align-items-center space-between"
				style={{ padding: '8px 12px', height: '29px', alignItems: 'center' }}
			>
				<section className="flex align-items-center">
					<button className="no-border no-background" style={{marginTop: '3px'}}>
						<i className="material-icons white">menu</i>
					</button>
					<span style={{ paddingLeft: '1rem' }}>{today.toLocaleDateString()}</span>
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
			<header
				className="shadow primary white flex align-items-center space-between"
				style={{ padding: '8px 12px', height: '29px', alignItems: 'center' }}
			>
				<section className="flex align-items-center">
					<button className="no-border no-background" onClick={props.leftIconOnClick}  style={{marginTop: '3px'}}>
						<i className="material-icons white">close</i>
					</button>
					<span style={{ paddingLeft: '1rem' }}>{today.toLocaleDateString()}</span>
				</section>
				<section role="toolbar" className="white">
					Save
				</section>
			</header>
		);
	}
}
