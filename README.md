# ev-2019-06-16

## Installation

The application requires that you have `Node.js` and `yarn` installed.

- Install the latest version of `node` from [here](https://nodejs.org/en/)
- Install the latest version of `yarn` from [here](https://yarnpkg.com/en/docs/install)

Clone and checkout this repository on the `master` branch.

Then run `yarn install --pure-lockfile` to install dependencies.

Then run `yarn dev` to run a local development server.

## Security

The majority of security concerns with file uploads need to be addressed server-side. This project doesn't not address them. Below is a checklist of security concerns identified. The ones with a checkmark have been address, the ones without a checkmark have NOT been addressed.

### Frontend

- [x] Requests to are paginated to handle large lists.
- [x] Uploaded images are shown via the `<img src/>` tag and attribute to prevent execution of malicious files.
- [x] Search requests are debounced to avoid spamming the API and reduce race conditions.
- [ ] Extremely large files are allowed to be sent to the backend and not restricted client-side causing potential server overload.
- [ ] A large number of third-party dependencies are used that have the possibility to inject malicious code. Tools like `ESlint`, `flow` and `husky` all execute code and perform automated code changes. In this case it helped for rapid development, but in a situation where security is paramount, these tools should be more carefully reviewed as they could easily introduce a vulnerability.
- [ ] Some small utility third-party dependencies are used to speed up development, but could introduce vulnerabilities if they are not carefully audited. For extra safety, it may be better to write custom solutions for these issues. For example, `classnames` could easily be rewritten as a custom function.

### Backend

- [x] Only `image/jpeg` and `image/png` mime types are allowed to be uploaded.
- [x] Only files less than 10mb in size are allowed to be uploaded.
- [ ] CSP rules should be defined on the endpoints to prevent external parties from using the API.
- [ ] Rate limiting and throttling should be applied to all endpoints to avoid DDOS attacks and general API misuse.
- [ ] If the mime type is spoofed or tampered with, no additional security checks are done before the file is stored.
- [ ] All files that are stored are exposed on via a public static directory, they should be sandboxed and served via a CSP protected endpoint instead.
- [ ] All files that are stored on disk should be encrypted.
- [ ] Logging and metrics should be captured for all API uses so we can perform audits of usage, identify which IP addresses are making requests and have the necessary troubleshooting information.

## Improvements

- [ ] `yarn` is used purely for convenience and speed of development. This extra dependency can be removed in favor of `npm` instead.
- [ ] All file metadata is stored in a JSON file. A database should be used instead to manage uploads and serving of existing info.
- [ ] When a new file is uploaded, a local cache of documents is updated in `pages/index.js`. This is very messy and not scalable. A better solution would be to use a global state management library like `redux`, but that wasn't allowed for this test.
- [ ] There's a UX issue. If you have a search filter defined and then upload a file that doesn't match that filter - you won't see the newly added file. At the moment, this is done intentionally but it should be given some thought to improve the experience. Maybe more clear messaging?
- [ ] The `<Masonry />` component in `<DocumentsGrid />` is a bit inefficient as a result of the server-side rendering. There are some performance improvements to be had here to clean up the logic which decides when cell measurements should be redone.
- [ ] Neither the frontend nor the backend API scale well to very large data sets. To solve this, pagination should be implemented on both the frontend as well as the `/api/documents` endpoint.
- [ ] Accessibility should be top-of-mind. For example, the `<DocumentTile />` component returns a clickable element but doesn't have the right `aria` attributes set.
- [ ] The error and success messages come into view in a very jumpy way. It would be a better experience to animate those sliding in instead. However, that might cause conflicts with the grid layout below due to how it calculates the windowing height.

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
- `@globexdesigns/deploy`: A small utility I wrote in my spare time to automate the deployment of the application to a public server where the application can be previewed easily.
- `eslint-config-cumul8`: My personal flavor of ESLint rules. Mostly here to keep me honest, keep the code quality high and help catch obvious bugs.
- `flow-bin`: A static typing tool to help increase my code quality and help catch bugs.
- `flow-typed`: Required by `flow`.
- `husky`: A bit overkill for this use case, but a reminder to myself to run tests after every commit via Git hooks.
- `lint-staged`: See note above in `husky`. Used for running lint checks on every commit.
- `prettier-package-json`: Keeps the `package.json` file clean.
- `stylelint-config-cumul8`: Same as `ESLint` but for CSS code. Ensures I adhere to best practices and keep a consistent code style.

## API

The backend API is a REST API written via `Node.js` and integrated into the server-side web server for the front-end application. This is not a good long-term solution but used here due to time constraints. In the real world I would have built the API as a separate stand-alone service, and likely in a more robust language such as `Golang` or `Python`.

### `GET /api/documents`

Returns a list of uploaded documents.

*URL Arguments:*

- *search?*: ?string - A string used to filter the returned documents by name. If not specified, all documents will be returned.

*Response:*

- Array<DocumentType>
- Code: 200

*Example:*

```
// Request
GET /api/documents/?search=Some

// Response
[{
	name: "Some file",
	size: 20000,
	url: "/static/uploads/123"
}]
```

### `DELETE /api/document/:id`

Deletes a specific document by id.

TODO

### `PUT /api/upload`

Uploads a new document.

TODO

## Other notes

I found the majority of my time was spent building the necessary mocking and functionality of the backend API. Given the requirements of the test I felt this was necessary to demonstrate the most real-world application. I would have loved to spend more time improving the design, code quality and user experience of the front-end but simply ran out of time.

The limitation that restricts the ability to use a state management library like Redux resulted in very messy code and a lot of callbacks being passed from component to components. This resulted in very inefficient and duplicated code. In a real world scenario I would have relied very heavily on some state management library to avoid having to hoist all state in the root `/pages/index.js` component.

Test coverage is very poor due to time constraints. Historically I always focus on delivering at least 90% code coverage on all code I write.
