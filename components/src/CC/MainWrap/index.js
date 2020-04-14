import React from 'react';

import { EventBus } from '../utils/index';

const event = EventBus.get();

function MainWrap(Component) {
	
	class Main extends React.Component {
		scrollWrapDom = React.createRef();

		getNeightborNode(scrollItem, children) {
			let lastChild = null;
			for (var i = 0; i < children.length; i += 1) {
				if (scrollItem !== children[i]) {
					lastChild = children[i];
					continue;
				}
				break;
			}
			const nextChild = children[i + 1];

			return {
				lastChild,
				nextChild,
			};
		}

		scrollTo = (scrollItem) => {
			const children = this.children;
			if (!children) return;

			const { lastChild, nextChild } = this.getNeightborNode(scrollItem, children);

			const {
				width: currentChildWidth,
				height: currentChildHeight,
				marginLeft: currentChildMarginLeft,
				marginRight: currentChildMarginRight,
			} = this.getDomSpace(scrollItem);
			const {
				width: lastChildWidth,
				height: lastChildHeight,
				marginLeft: lastChildMarginLeft,
				marginRight: lastChildMarginRight,
			} = this.getDomSpace(scrollItem);
			const {
				width: nextChildWidth,
				height: nextChildHeight,
				marginLeft: nextChildMarginLeft,
				marginRight: nextChildMarginRight,
			} = this.getDomSpace(nextChild);

			const { width, left, right } = this.getScrollItemProps(scrollItem);

			if (lastChild && left - currentChildMarginLeft < lastChildWidth + lastChildMarginLeft + lastChildMarginRight) {
				this.scrollWrapDom.current.scrollTo({
					left: this.scrollWrapDom.current.scrollLeft - (lastChildWidth + lastChildMarginLeft + lastChildMarginRight - (left - currentChildMarginLeft)),
					behavior: 'smooth',
				});
				return;
			}

			if (nextChild && this.scrollWrapDom.current.getBoundingClientRect().width - (right + currentChildMarginRight) < nextChildWidth + nextChildMarginLeft + nextChildMarginRight) {
				this.scrollWrapDom.current.scrollTo({
					left: this.scrollWrapDom.current.scrollLeft + nextChildWidth + nextChildMarginLeft + nextChildMarginRight - (this.scrollWrapDom.current.getBoundingClientRect().width - (right + currentChildMarginRight)),
					behavior: 'smooth',
				});
				return;
			}
		}

		getDomSpace(dom) {
			if (!dom) return {};

			const {
				marginLeft,
				marginRight,
				marginTop,
				marginBottom,
			} = window.getComputedStyle(dom);		
			const {
				width,
				height,
			} = dom.getBoundingClientRect();

			return {
				width,
				height,
				marginLeft: parseInt(marginLeft),
				marginRight: parseInt(marginRight),
				marginTop: parseInt(marginTop),
				marginBottom: parseInt(marginBottom),
			};
		}

		getScrollItemProps(scrollItem) {
			const { width, left, right } = scrollItem.getBoundingClientRect();

			return {
				width,
				left,
				right,
			};
		}

		initChildren() {
			if (this.scrollWrapDom.current) {
				this.children = this.scrollWrapDom.current.children;	
			} else {
				this.children = null;
			}
		}

		componentDidMount() {
			event.subscribe('main-scroll-to', this.scrollTo);
			this.initChildren();
		}

		componentDidUpdate() {
			this.initChildren();
		}

		componentWillUnmount() {
			event.unsubscribe('main-scroll-to', this.scrollTo);
		}

		render() {
			return (
				<Component ref={this.scrollWrapDom} />
			);
		}
	}

	return Main;
}

export default MainWrap;
