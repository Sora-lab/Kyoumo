import React from 'react';
interface Props {
	layout: string;
	leftIconOnClick: () => void;
}
export function AppBar(props: Props) {
	const today = new Date();
	let toolbar: JSX.Element = <></>;
	let menuIcon: JSX.Element = <></>;
	const defaultToolbar = (
		<section role="toolbar ">
			<button className="no-border no-background">
				<i className="material-icons white">search</i>
			</button>
			<button className="no-border no-background">
				<i className="material-icons white">more_vert</i>
			</button>
		</section>
	);
	const formToolBar = (
		<section role="toolbar" className="white">
			<button className="no-border no-background white">SAVE</button>
		</section>
	);
	const hamburgerButton = (
		<button className="no-border no-background" style={{ marginTop: '3px' }}>
			<i className="material-icons white">menu</i>
		</button>
	);
	const closeButton = (
		<button
			className="no-border no-background"
			style={{ marginTop: '3px' }}
			onClick={() => {
				props.leftIconOnClick();
			}}
		>
			<i className="material-icons white">close</i>
		</button>
	);

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
			{toolbar}
		</header>
	);
}
