import React from 'react';

import mock from '../mock.js';
import mock1 from '../mock1.js';
import mock2 from '../mock2.js';
import mock3 from '../mock3.js';
import mock4 from '../mock4.js';
import mock5 from '../mock5.js';
import mock6 from '../mock6.js';
import mock7 from '../mock7.js';
import styles from './style.module.css';

import CrossHoc from '../CC/CrossWrap';
import CrossItemHoc from '../CC/Cross';

const titles = ['藤和艾莉欧', '御坂美琴', 'Saber', '漩涡鸣人', '穹妹', '朝田诗乃', '涂山苏苏', '雷姆'];

const dataSource = [mock, mock1, mock2, mock3, mock4, mock5, mock6, mock7].map((
	mock,
	index,
) => {
	const title = titles[index];

	return {
		title,
		imgs: mock,
		id: index,
	};
});

const Card = React.memo(function(props) {
	const { src } = props;
	
	return (
		<div className={styles.cardWrap}>
			<img className={styles.cardImg} src={src} />	
		</div>
	);
});

const Cards = React.memo(function(props) {

	return (
		<div className={styles.cards}>	
			{
				props.imgs.map((src, index) => (
					<Card src={src} key={index} />
				))
			}	
		</div>
	);
});

const TitleCard = CrossItemHoc(React.memo(React.forwardRef(function(props, ref) {
	return (
		<>
			<div className={styles.over} ref={ref}>
				<p className={styles.title}>{props.title}</p>
				<Cards imgs={props.imgs} />
			</div>
		</>
	);
})));

class Column extends React.Component {
	
	render() {
		return (
			<div className={styles.columnWrap}>
				{
					dataSource.map((data, index) => (
						<TitleCard key={index} {...data} offset={60} />
					))
				}				
			</div>
		);
	}
}

export default CrossHoc(Column, { window, offset: 60 });
