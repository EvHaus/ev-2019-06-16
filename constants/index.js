// @flow

import path from 'path';

// Space between the tiles in the documents grid
export const GUTTER_SIZE = 16;

// Maximum file name length allowed (in characters)
export const MAX_FILE_NAME_LENGTH = 256;

// Maximum upload file size (10 MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

// The width breakpoint at which the app should switch to a mobile layout
export const MOBILE_WIDTH = 960;

// The path to the root
export const ROOT_DIR = path.join(__dirname, '..');

// The height of a tile in the documents grid (in pixels)
export const TILE_HEIGHT = 96;

// The width of a tile in the documents grid (in pixels)
export const TILE_WIDTH = 234;

// The path to the directory where files will be uploaded
export const UPLOAD_DIR = path.join(ROOT_DIR, 'static', 'uploads');

// A list of allowed upload mime types
export const VALID_FILE_TYPES = ['image/jpeg', 'image/png'];
