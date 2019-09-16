# Static Website Front End Build

This project has been build using `Gulp`, `SCSS`, latest `ES6` –with support to all browsers thanks to `Babel`– and `Nunjucks` as HTML template system.

## Scripts

#### Development build
```
npm run build
```

#### Production build
```
npm run build:prod
```
>`NODE_ENV=production` will be set to `production` and Gulp will minify the JS, CSS and HTML

#### Watch mode with Browsersync
```
npm run watch
```
By running this command, a development server is started by `Browsersync`, and on every file change, the browser will react and update without reloading the page.

### Technologies used:
- Gulp with multiple plugins (babel, cssnano, htmlmin, if, nunjucks, sass)
- Sass
- Bootstrap
- Latest ES6 (with support to all browsers thanks to Babel)
- Nunjucks (Prototyping HTML)
- Lint JS (eslint) and CSS (stylelint)
- editorconfig
- Every build Test -> travis
