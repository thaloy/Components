import React from 'react';

import { EventBus } from '../utils';

const event = EventBus.get();

export default function Cross(Component) {

	class CrossItem extends React.Component {
		crossItem = React.createRef();	

		componentDidMount() {
			event.subscribe('cross-scroll-to', this.scrollTo);
			event.subscribe('cross-scroll', this.scroll);
			this.top = this.crossItem.current.getBoundingClientRect().top;
		}

		scrollTo = (id) => {
			if (this.props.id !== id)	return;

			event.notify('cross-scroll-by-main', { top: this.top });
		}

		scroll = () => {
			const { top, height } = this.crossItem.current.getBoundingClientRect();

			if (top <= (this.props.offset || 0) && top >= -height + this.props.offset) {
				event.notify('main-scroll-by-cross', this.props.id);
				return;
			}
		}

		render() {
			return (
				<Component {...this.props} ref={this.crossItem} />
			);
		}
	}

	return CrossItem;
}
