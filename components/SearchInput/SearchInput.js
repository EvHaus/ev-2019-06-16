// @flow

import React, {type Element, useState} from 'react';
import styles from './SearchInput.css';

type PropsType = {|
	onChange: (value: string) => any,
|};

export const SearchInput = ({
	onChange,
}: PropsType): Element<'div'> => {
	const [value, setValue] = useState('');

	const _handleChange = ({target: {value}}: SyntheticInputEvent<HTMLInputElement>) => {
		// Set local value
		setValue(value);

		// Since we can't use Redux or other state management, we'll just
		// propagate up to the component above.
		onChange(value);
	};

	return (
		<div className={styles.main}>
			<input
				className={styles.input}
				onChange={_handleChange}
				placeholder='Search documents...'
				type='text'
				value={value} />
		</div>
	);
};

SearchInput.displayName = 'SearchInput';

export default SearchInput;
