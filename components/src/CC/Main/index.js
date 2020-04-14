import React from 'react';

import { EventBus } from '../utils';

import styles from './style.module.css';

const event = EventBus.get();

function de(func, delay) {
	let timeout = null;

	return function xx(...values) {
		if (timeout) clearTimeout(timeout);	

		timeout = setTimeout(() => {
			func(...values)
		}, delay);
	}
}

function Main(Component) {
	
	class MainItem extends React.Component {
		scrollItem = React.createRef();

		click = (e) => {
			event.notify('cross-scroll-to', this.props.id);
			event.notify('main-scroll-to', this.scrollItem.current);
			this.props.onClick && this.props.onClick(e, this.props.id);
		}

		componentDidMount() {
			event.subscribe('main-scroll-by-cross', (id) => {
				if (this.props.id !== id) return;
				this.props.onClick && this.props.onClick(null, this.props.id);
				event.notify('main-scroll-to', this.scrollItem.current);
			}, 200);
		}

		render() {
			return (
				<Component {...this.props} onClick={this.click} ref={this.scrollItem} />
			);
		}
	}

	return MainItem;
}

export default Main;
