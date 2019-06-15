// @flow

import React, {type Element} from 'react';
import Button from '../Button';

export const UploadButton = (): Element<typeof Button> => (
	<Button>
		Upload
	</Button>
);

UploadButton.displayName = 'UploadButton';

export default UploadButton;
