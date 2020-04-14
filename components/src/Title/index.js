import React from 'react';

import imgs from './mock';
import styles from './style.module.css';

import Main from '../CC/Main/index';

const dataSource = imgs.map((img, index) => ({
	id: index,
	img,		
	actived: false,
}));
dataSource[0].actived = true;

const Img = React.memo(React.forwardRef(function(props, ref) {
	const { src, onClick, actived } = props;
	return (
		<div
			ref={ref}
			onClick={onClick}
			className={styles.titleContainer}
		>
			<img src={src}></img>
			{ actived && <div className={styles.activeLine}></div> } 
		</div>
	);
}));

const NewImg = Main(Img); 

class Title extends React.Component {
	state = { dataSource };

	click = (e, id) => {
		this.setState({
			dataSource: dataSource.map(data => {
				if (data.id === id) {
					return {
						...data,
						actived: true,
					}
				}

				return {
					...data,
					actived: false,
				}
			})
		})
	}

	render() {
		const { dataSource } = this.state;
		return (
			<div
				ref={this.props.forwardRef}
				className={styles.titleWrap}
				onScroll={this.props.onScroll}
			>
					{dataSource.map((data, index) => (
						<NewImg id={data.id} actived={data.actived} key={index} src={data.img} onClick={this.click} />
					))}
			</div>
		);
	}
}

export default React.forwardRef((props, ref) => (
		<Title {...props} forwardRef={ref} />
));

