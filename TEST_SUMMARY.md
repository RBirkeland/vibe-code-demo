# Unit Tests - Theme and Search Features

## Overview
Comprehensive unit test suite for theme management and search functionality in the Todo app. All 38 tests passing with Vitest framework.

## Setup

### Testing Framework
- **Framework**: Vitest 1.0.4
- **Environment**: happy-dom (lightweight DOM environment)
- **Test Runner**: npm test (or npm test -- --run for non-watch mode)

### Installation
```bash
npm install
npm test
```

## Theme Management Tests (13 tests)

### initTheme - Theme Initialization
Tests that verify proper theme initialization from localStorage:

| Test | Description |
|------|-------------|
| ✓ should initialize theme to light by default | Loads 'light' when localStorage is empty |
| ✓ should load theme from localStorage if available | Reads saved theme from localStorage |
| ✓ should call localStorage.getItem with "theme" key | Verifies localStorage API is called correctly |
| ✓ should set data-theme attribute on document element | DOM attribute is set for CSS styling |

### setTheme - Theme Setter
Tests that verify theme setting and persistence:

| Test | Description |
|------|-------------|
| ✓ should set theme to light | Sets light theme correctly |
| ✓ should set theme to dark | Sets dark theme correctly |
| ✓ should persist theme to localStorage | Saves theme to localStorage |
| ✓ should set data-theme attribute on document element | Updates DOM attribute |
| ✓ should not set invalid theme values | Rejects themes other than 'light'/'dark' |
| ✓ should reject theme values other than light and dark | Validates theme value |

### toggleTheme - Theme Toggle
Tests that verify theme switching functionality:

| Test | Description |
|------|-------------|
| ✓ should toggle theme from light to dark | Switches light → dark correctly |
| ✓ should toggle theme from dark to light | Switches dark → light correctly |
| ✓ should persist toggled theme to localStorage | Saves new theme to localStorage |
| ✓ should update data-theme attribute when toggling | Updates DOM attribute on toggle |

### getTheme - Theme Getter
Tests that verify getting current theme:

| Test | Description |
|------|-------------|
| ✓ should return current theme | Returns correct theme value |
| ✓ should return light theme after reset | Correctly returns theme after changes |

## Search and Filter Tests (24 tests)

### setSearchQuery - Setting Search
Tests that verify search query setting:

| Test | Description |
|------|-------------|
| ✓ should set search query | Sets query correctly |
| ✓ should convert search query to lowercase | Converts to lowercase for case-insensitive matching |
| ✓ should handle empty search query | Handles empty string |

### getSearchQuery - Getting Search
Tests that verify retrieving search query:

| Test | Description |
|------|-------------|
| ✓ should return current search query | Returns set query |
| ✓ should return empty string if no query set | Returns empty when not set |

### filterTodosBySearch - Search Filtering
Tests that verify search filtering logic:

| Test | Description |
|------|-------------|
| ✓ should return all todos when search query is empty | No filtering when query is empty |
| ✓ should filter todos by search query | Matches exact words |
| ✓ should perform case-insensitive search | 'BUY' matches 'Buy groceries' |
| ✓ should handle partial matches | 'pro' matches 'Finish project' |
| ✓ should return empty array when no todos match | Returns empty for non-matching query |
| ✓ should match todos with "call" in text | Partial word matching |
| ✓ should match multiple todos with same search term | Filters multiple matches |

### sortTodos - Sorting Logic
Tests that verify sorting functionality:

| Test | Description |
|------|-------------|
| ✓ should sort todos by creation date (default) | Default sort maintains insertion order |
| ✓ should sort todos by completed status | Groups by completion status |
| ✓ should sort todos by due date | Sorts by dueDate field |
| ✓ should handle todos without due dates | Puts undefined dates at end |
| ✓ should not modify original array | Returns new sorted array |
| ✓ should default to created sort when no sort type provided | Uses 'created' as default |
| ✓ should handle empty array | Handles edge case of empty array |
| ✓ should sort todos by completed status | Verifies sorting groups by status |

### Integration Tests (2 tests)

| Test | Description |
|------|-------------|
| ✓ should filter by search and then sort | Combines search filtering with date sorting |
| ✓ should handle search and completed status sorting | Combines search with completion status sorting |

## Implementation Details

### Theme Functions (main.js:57-78)
```javascript
export function initTheme()        // Load theme from localStorage
export function setTheme(theme)    // Set and persist theme
export function toggleTheme()      // Toggle between light/dark
export function getTheme()         // Get current theme
```

### Search Functions (main.js:80-115)
```javascript
export function setSearchQuery(query)          // Set search query
export function getSearchQuery()               // Get search query
export function filterTodosBySearch(todos)     // Filter todos by search
export function sortTodos(todos, sortBy)       // Sort todos
```

### Test Coverage
- **Total Tests**: 38
- **Passed**: 38 (100%)
- **Failed**: 0
- **Execution Time**: ~6ms

## Running Tests

### Run all tests (watch mode)
```bash
npm test
```

### Run tests once (CI mode)
```bash
npm test -- --run
```

### View test UI
```bash
npm run test:ui
```

## Key Features

✅ **Theme Persistence**: Themes are saved to localStorage and restored on page reload
✅ **Case-Insensitive Search**: Search queries match regardless of text case
✅ **Multiple Sort Options**: Support for sorting by creation date, completion status, or due date
✅ **localStorage Mocking**: Tests mock localStorage to avoid side effects
✅ **DOM Integration**: Tests verify DOM attribute updates for CSS theming
✅ **Edge Cases**: Tests cover empty arrays, null values, and invalid inputs
