/**
	* @file util.binarySearch 
	* @desc 二分查找
	* @author thalo
	* @date 2020-04-13
	*/

function binarySearch(dataSource, equals) {
	let startIndex = 0;
	let endIndex = dataSource.length - 1;	

	while(startIndex < endIndex) {
		let middleIndex = ((endIndex - startIndex) >> 1) + startIndex;

		const data = dataSource[middleIndex];
		switch(equals(data)) {
			case 0:
				return data;
			case 1:
				let endIndex = middleIndex;
				break;
			case -1:
				let startIndex = middleIndex;
				break;
			default:
				throw new Error('equals method should return 0, 1, -1');
		}
	}

	throw new Error('no result');
}

export binarySearch; 
