import React from 'react';

import { EventBus } from '../utils';

const event = EventBus.get();

export default function CrossHoc(Component, {
	window,
	offset = 0,
}) {

	class Cross extends React.Component {
		
		componentDidMount() {
			if (window) {
				window.addEventListener('scroll', (e) => {
					if (this.scrollTo === Infinity) event.notify('cross-scroll');
					if (window.scrollY === this.scrollTo) this.scrollTo = Infinity;
				}, false);
			}
			event.subscribe('cross-scroll-by-main', this.scroll);
		}

		scroll = ({ top, left }) => {
			if (window) {
				window.scrollTo({
					top: top - offset,
					behavior: 'smooth',
				});
				this.scrollTo = top - offset;
				return;
			}	
		}

		render() {
			return (
				<Component {...this.props} />
			);
		}
	}
	
	return Cross;
}
