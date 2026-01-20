# Available NPM Scripts

This document describes all available scripts configured in `package.json` for the Vibe Kanban Todo App project.

## Development Scripts

### `npm run dev` (or `npm start`)
Starts the Vite development server with automatic browser opening.
- Port: `5173`
- Features: Hot Module Replacement (HMR), auto-refresh on file changes
- **Best for**: Local development workflow
- **Command**: `vite --open`

### `npm run dev:watch`
Starts the Vite development server with enhanced watch mode.
- Port: `5173`
- Features: HMR, file watchers, auto-refresh
- **Best for**: Active development with file watching enabled
- **Command**: `vite --open --watch`

## Build Scripts

### `npm run build`
Creates an optimized production build with minification enabled.
- Output: `dist/` directory
- Features: Minified assets, source maps disabled, optimized bundle
- **Best for**: Preparing code for production deployment
- **Command**: `vite build --minify`

### `npm run build:watch`
Creates a production build with watch mode enabled for iterative builds.
- Output: `dist/` directory
- Features: Re-builds on file changes, useful for build pipeline testing
- **Best for**: Testing build process changes during development
- **Command**: `vite build --watch`

### `npm run preview`
Serves the built production artifacts locally.
- Port: `4173` (default Vite preview port)
- Features: Auto-opens browser, simulates production environment
- **Best for**: Testing production build locally before deployment
- **Command**: `vite preview --open`

## Cleaning Scripts

### `npm run clean`
Completely removes all generated artifacts and node_modules.
- Removes: `dist/`, `node_modules/`, `.vite/` cache
- **Best for**: Complete project reset (requires `npm install` after)
- **Command**: `rm -rf dist node_modules .vite`

### `npm run clean:dist`
Removes only the build output directory.
- Removes: `dist/` directory
- **Best for**: Quick cleanup before rebuilding without reinstalling dependencies
- **Command**: `rm -rf dist`

## Linting & Code Quality Scripts

### `npm run lint`
Runs all linting checks (JavaScript and CSS).
- Checks: ESLint for JavaScript, Stylelint for CSS
- **Best for**: Code quality validation
- **Command**: `npm run lint:js && npm run lint:css`

### `npm run lint:js`
Runs ESLint on JavaScript files.
- Target: `main.js`
- **Best for**: JavaScript-only validation
- **Command**: `eslint main.js`

### `npm run lint:css`
Runs Stylelint on CSS files.
- Target: `styles.css`
- **Best for**: CSS-only validation
- **Command**: `stylelint styles.css`

### `npm run lint:fix` (or `npm run format`)
Automatically fixes linting issues in both JavaScript and CSS.
- Fixes: Auto-fixable ESLint and Stylelint violations
- **Best for**: Quick code format fixes before committing
- **Command**: `eslint main.js --fix && stylelint styles.css --fix`

### `npm run lint:watch`
Runs linting with automatic fixes in watch mode.
- **Best for**: Continuous code quality during development
- **Command**: `npm run lint:fix -- --watch`

## Validation Scripts

### `npm run validate`
Comprehensive validation pipeline (lint → type-check → build).
- Steps:
  1. Runs all linting checks
  2. Runs type checking
  3. Creates production build
- **Best for**: Pre-commit or pre-deployment validation
- **Command**: `npm run lint && npm run type-check && npm run build`

### `npm run type-check`
Placeholder for TypeScript type checking.
- **Note**: Currently a placeholder. Configure with your type checker (e.g., tsc, TypeScript)
- **Best for**: Future TypeScript support
- **Command**: `echo 'Run type checking if using TypeScript'`

### `npm run test`
Placeholder for running tests.
- **Note**: Currently a placeholder. Configure with your test runner (e.g., Vitest, Jest)
- **Best for**: Future test suite setup
- **Command**: `echo 'Configure test runner (e.g., vitest, jest)'`

## Common Workflows

### Starting Development
```bash
# Quick start with auto-refresh
npm run dev

# Or with explicit watch mode
npm run dev:watch
```

### Before Committing
```bash
# Validate code and build
npm run validate

# Or just format without full validation
npm run format
```

### Building for Production
```bash
# Clean and build
npm run clean:dist && npm run build

# Test production build locally
npm run build && npm run preview
```

### Full Project Reset
```bash
# Clean everything and reinstall
npm run clean
npm install
```

## Performance Tips

1. **Development**: Use `npm run dev` for faster iteration with HMR
2. **Build**: The `--minify` flag uses esbuild for fast, efficient minification
3. **Caching**: Vite automatically caches builds in `.vite/` directory
4. **Watch Mode**: Use `--watch` flags for iterative development and testing

## Configuration Details

### Build Optimization Settings (vite.config.js)

- **Output Directory**: `dist/`
- **Minifier**: esbuild (fastest JavaScript minifier)
- **Source Maps**: Disabled for production (smaller bundle)
- **Chunk Size Warning**: 500KB threshold
- **HMR**: Enabled for instant updates during development
- **Watch Polling**: Disabled (uses native file watchers for performance)

### Linting Configuration

- **JavaScript Linter**: ESLint
  - Config: `.eslintrc.json`
  - Ignore patterns: `.eslintignore`

- **CSS Linter**: Stylelint
  - Config: `.stylelintrc.json`
  - Ignore patterns: `.stylelintignore`
  - Preset: `stylelint-config-standard`

## Future Enhancements

These scripts are ready to be extended with:
- TypeScript support (`npm run type-check`)
- Test suite (`npm run test`)
- Pre-commit hooks for automated validation
- CI/CD integration for continuous quality checks
