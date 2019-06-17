# ev-2019-06-16

## Installation

> *NOTE*: Development was done on MacOS. It's likely these instructions will still work on Linux and Windows machines however this was not tested.

### Prerequisites

The application requires that you have `Node.js` and `yarn` installed.

- Install the latest version of `node` from [here](https://nodejs.org/en/)
- Install the latest version of `yarn` from [here](https://yarnpkg.com/en/docs/install)

### Running a local development server

- Clone and checkout this repository on the `master` branch from `https://github.com/EvHaus/ev-2019-06-16`
- Run `yarn install --pure-lockfile` to install dependencies
- Run `yarn dev` to start a local development server
- The application will start up on http://localhost:3000/

> *NOTE*: Testing was only done with the latest version of Google Chrome. Other browsers may not be fully supported.

### Scripts

- `yarn test`: Run all lint and tests
- `yarn jest`: Run just the unit tests via Jest

## Security

The majority of security concerns with file uploads need to be addressed server-side on the backend. This project doesn't not address a large number of them as per the requirements. Below is a checklist of security concerns identified. The ones with a checkmark have been address, the ones without a checkmark have *NOT* been addressed.

### Frontend

- [x] Search requests are debounced to avoid spamming the API and reduce race conditions.
- [x] The names of uploaded files are shown but are processed through React to avoid XSS injections.
- [x] Files are validates for valid MIME type and extension, as well as file size. However, since the API is open the public, these security checks are superficial and easily bypassed.
- [x] File names are checked for maximum lengths to avoid crashing the backend. A maximum lenght of 256 characters was chosen arbitrarily.
- [x] All dependencies in `package.json` are pinned to specific versions and `yarn.lock` file is used to avoid unintended packages from being bundled in during re-installs.
- [ ] Uploaded images are not actually shown or rendered in any way to avoid potential execution of malicious files.
- [ ] Extremely large files are allowed to be sent to the backend and not restricted client-side causing potential server overload.
- [ ] A large number of third-party dependencies are used that have the possibility to inject malicious code. Tools like `ESlint`, `flow` and `husky` all execute code and perform automated code changes. In this case it helped for rapid development, but in a situation where security is paramount, these tools should be more carefully reviewed as they could easily introduce a vulnerability.
- [ ] Some small utility third-party dependencies are used to speed up development, but could introduce vulnerabilities if they are not carefully audited. For extra safety, it may be better to write custom solutions for these issues. For example, `classnames` could easily be rewritten as a custom function.

### Backend

- [x] Only `image/jpeg` and `image/png` mime types are allowed to be uploaded.
- [x] Only files less than 10mb in size are allowed to be uploaded.
- [x] HTTPS is used (in production mode only) using a "Let's Encrypt" certificate.
- [x] In addition to mime type validation, file extension validation (including double extensions) are also tested.
- [x] Uploaded file names are renamed, given a unique hash name and have their extensions stripped.
- [ ] Most of the common validation issues described in https://www.owasp.org/index.php/Unrestricted_File_Upload have been addressed, however, a full audit was not performed.
- [ ] Downloaded files are returned using their hashed name and lack of extension. A dedicated `/download` API should be created to be able to download a file via its ID and return the file with the original file name.
- [ ] CSP rules should be defined on the endpoints to prevent external parties from using the API.
- [ ] CORS headers should be set on all endpoints.
- [ ] Rate limiting and throttling should be applied to all endpoints to avoid DDOS attacks and general API misuse.
- [ ] If the mime type is spoofed or tampered with, no additional security checks are done before the file is stored.
- [ ] If the file extension is spoofed or tampered with, no additional security checks are done before the file is stored.
- [ ] All files that are stored on disk should be outside the web server's root directory.
- [ ] All files that are stored are exposed on via a public static directory, they should be sandboxed and served via a dedicated, CSP protected endpoint instead.
- [ ] All files that are stored on disk should be encrypted.
- [ ] All files that are uploaded should be run through antivirus software.
- [ ] Some endpoint errors are returned as they are captured by the Node.js engine, which in some cases can potentially reveal sensitive information such as file paths.
- [ ] Logging and metric tracking should be added for all API endpoints so audits of usage can be performed, and we can identify which IP addresses are making requests. It would also be helpful with troubleshooting.

## Improvements

- [ ] `yarn` is used purely for convenience and speed of development. This extra dependency can be removed in favor of `npm` instead which would reduce an extra dependency and installation step.
- [ ] All file metadata is stored in a simulated JSON `DATABASE.json` file. A real database should be used instead to manage uploads and serving of existing info.
- [ ] When a new file is uploaded, a local cache of documents is updated in `hooks/useDocumentsReducer.js`. This is very messy and not scalable. A better solution would be to use a global state management library like `redux`.
- [ ] There's a UX issue that needs discussion. If you have a search filter defined and then upload a file that doesn't match that filter - you will still see the newly added file. At the moment, this is done intentionally but it should be given some thought to improve the experience. Maybe not show the item, but make the success messaging more clear?
- [ ] The `<Masonry />` component in `<DocumentsGrid />` is a bit inefficient as a result of the server-side rendering. There are some performance improvements to be had here to clean up the logic which decides when cell measurements should be redone.
- [ ] Neither the frontend nor the backend API scale well to very large data sets. To solve this, pagination should be implemented on both the frontend as well as the `/api/documents` endpoint. This would greatly change the request and response structure of the `GET /uploads` API endpoint.
- [ ] Accessibility was not top-of-mind. For example, the `<Button />` component returns a clickable element but doesn't have the right `aria-label` attributes set.
- [ ] A lot of strings (ie. error messages) are duplicated and some inefficient string formatting is used. Moving to a localization library like `i18next` would clean this up.
- [ ] The error and success messages come into view in a very jumpy way. It would be a better experience to animate those sliding in or render them outside the main containers to prevent the jumping altogether.
- [ ] Development was done with the latest version of Google Chrome. Other browsers may not be fully supported and may have edge cases that need to be addressed.

## Libraries

### Direct Dependencies

- `@zeit/next-css`: Used to handle CSS Module loading in the application. Required by `next`.
- `classnames`: A small utility to clean up the concatenation of CSS class names. Can be easily removed but was used due to time constraints.
- `formidable`: Helper utility for parsing file uploads on the backend. Used due to time constraints.
- `greenlock-express`: Needed for HTTPS certificates on productions builds.
- `greenlock-store-fs`: Needed for HTTPS certificates on productions builds.
- `koa`: This is the primary web server. This is used instead of something like `express` due to me having pre-existing templates already setup with `koa` for handling production builds, `greenlock` integration, support for API routing, and server-side rendering.
- `koa-body`: A web server utility for parsing JSON form bodies. Required by `koa`.
- `koa-router`: A small utility to make API endpoints easy to generate. Required by `koa`.
- `next`: Due to time constraints I used `next` as my main framework of choice. It allows me to quickly build a React-based front-end and have the necessary hooks to build a simple `Node.js` based API.
- `numeral`: A small utility used to format numbers, specifically bytes to kilobytes in the UI.
- `react`: The main front-end library as per original requirements.
- `react-dom`: Required by `react`.
- `react-virtualized`: In a real world application, we can imagine the number of documents to be very large. In order to nicely handle large lists and be able to handle mobile grid layouts efficiently this is used to render the grid UI, created a virtualized/windowed list for performance reasons and help with the responsive mobile layout.
- `redirect-https`: Minor utility used in production builds to redirect `http` requests to `https`.

### Dev Dependencies

- `@babel/preset-flow`: Required by `flow`.
- `@babel/register`: A bit overkill for this use case, but I prefer to use ES6 syntax and ES6 modules on the backend code and this allowed me to do this at a small performance cost.
- `eslint-config-cumul8`: My personal flavor of ESLint rules. Mostly here to keep me honest, keep the code quality high and help catch obvious bugs.
- `flow-bin`: A static typing tool to help increase my code quality and help catch bugs.
- `flow-typed`: Required by `flow`.
- `enzyme`: Used to test React components via `jest`.
- `enzyme-adapter-react-16`: Required by `enzyme`.
- `husky`: A bit overkill for this use case, but a reminder to myself to run tests after every commit via Git hooks.
- `identity-obj-proxy`: Required by `jest` in order to be used with CSS Modules.
- `jest`: The requirements specified that unit tests must be included. Jest is the runner I'm most familiar with so I've used that for including tests.
- `lint-staged`: See note above in `husky`. Used for running lint checks on every commit.
- `prettier-package-json`: Keeps the `package.json` file clean.
- `stylelint-config-cumul8`: Same as `ESLint` but for CSS code. Ensures I adhere to best practices and keep a consistent code style.

## API

The backend API is a REST API written via `Node.js` and integrated into the server-side web server for the front-end application. This is not a good long-term solution but used here due to time constraints. In the real world I would have built the API as a separate stand-alone service, and likely in a more robust language such as `Golang` or `Python`.

This documentation references some pre-defined types (eg. `DocumentType`). Details on these structures can be found in `/types/index.js`.

### `GET /api/documents`

Returns a list of uploaded documents.

*URL Arguments:*

- *search?*: ?string - A string used to filter the returned documents by name. If not specified, all documents will be returned.

*Response:*

- `{documents: Array<DocumentType>, totalSize: number}`
- Code: 200

*Example:*

```
// Request
GET /api/documents/?search=Some

// Response
{
	documents: [{
		id: "upload_c69b44656d92935c9ef810cf22c5620c",
		name: "your_file.jpg",
		size: 5369132,
		url: "/static/uploads/upload_c69b44656d92935c9ef810cf22c5620c",
	}],
	totalSize: 5369132,
}
```

*Errors:*

- Code: 413 (The file you selected is too big)
- Code: 415 (The file you selected is not supported.)

### `DELETE /api/document/:id`

Deletes a specific document by id.

*Response:*

- DocumentType
- Code: 200

*Example:*

```
// Request
DELETE /api/documents/upload_123

// Response
{
	id: "upload_123",
	name: "your_file.jpg",
	size: 5369132,
	url: "/static/uploads/upload_123",
}
```

### `PUT /api/upload`

Uploads a new document.

*POST Body Argument:*

- *file*: binary - The file you want to upload as a binary blob.

*Response:*

- `DocumentType`
- Code: 200

*Example:*

```
// Request
PUT /api/upload

// Request POST body
{
	file: (binary)
}

// Response
{
	id: "upload_c69b44656d92935c9ef810cf22c5620c",
	name: "your_file.jpg",
	size: 5369132,
	url: "/static/uploads/upload_c69b44656d92935c9ef810cf22c5620c",
}
```

## Other notes

I found the majority of my time was spent building the necessary mocking and functionality of the backend API. Given the requirements of the test I felt this was necessary to demonstrate the most real-world application. I would have loved to spend more time improving the visual design, code quality and user experience of the front-end but simply ran out of time.

The limitation that restricts the ability to use a state management library like Redux resulted in very messy code and a lot of callbacks being passed from component to components. I was able to work around this limitation by using the new `useReducer` hook API but I feel like this was slightly cheating on the initial requirements. Earlier commits of this project used `useState` callbacks local to the components, but that resulted in very buggy code. In a real world scenario I would have relied very heavily on some state management library to avoid having to hoist all state in the root `/pages/index.js` component via a single giant hook.

Test coverage is very poor due to time constraints. Historically I always focus on delivering at least 90% code coverage on all unit code I write. I would have liked to also add `cypress` to add some E2E tests which fully test the functionality as unit tests are not good enough for validating functionality.
