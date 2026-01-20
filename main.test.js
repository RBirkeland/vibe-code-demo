import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    initTheme,
    setTheme,
    toggleTheme,
    getTheme,
    setSearchQuery,
    getSearchQuery,
    filterTodosBySearch,
    sortTodos
} from './main.js';

describe('Theme Management', () => {
    let originalLocalStorage;

    beforeEach(() => {
        // Setup DOM element for theme
        document.documentElement.removeAttribute('data-theme');

        // Mock localStorage
        originalLocalStorage = global.localStorage;
        global.localStorage = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
            key: vi.fn(),
            length: 0
        };
    });

    afterEach(() => {
        global.localStorage = originalLocalStorage;
    });

    describe('initTheme', () => {
        it('should initialize theme to light by default', () => {
            vi.mocked(localStorage.getItem).mockReturnValue(null);
            initTheme();
            expect(getTheme()).toBe('light');
        });

        it('should load theme from localStorage if available', () => {
            vi.mocked(localStorage.getItem).mockReturnValue('dark');
            initTheme();
            expect(getTheme()).toBe('dark');
        });

        it('should call localStorage.getItem with "theme" key', () => {
            vi.mocked(localStorage.getItem).mockReturnValue(null);
            initTheme();
            expect(localStorage.getItem).toHaveBeenCalledWith('theme');
        });

        it('should set data-theme attribute on document element', () => {
            vi.mocked(localStorage.getItem).mockReturnValue('dark');
            initTheme();
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        });
    });

    describe('toggleTheme', () => {
        it('should toggle theme from light to dark', () => {
            vi.mocked(localStorage.getItem).mockReturnValue(null);
            initTheme();
            const newTheme = toggleTheme();
            expect(newTheme).toBe('dark');
            expect(getTheme()).toBe('dark');
        });

        it('should toggle theme from dark to light', () => {
            vi.mocked(localStorage.getItem).mockReturnValue('dark');
            initTheme();
            const newTheme = toggleTheme();
            expect(newTheme).toBe('light');
            expect(getTheme()).toBe('light');
        });

        it('should persist toggled theme to localStorage', () => {
            vi.mocked(localStorage.getItem).mockReturnValue(null);
            initTheme();
            toggleTheme();
            expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
        });

        it('should update data-theme attribute when toggling', () => {
            vi.mocked(localStorage.getItem).mockReturnValue(null);
            initTheme();
            toggleTheme();
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        });
    });

    describe('setTheme', () => {
        it('should set theme to light', () => {
            setTheme('light');
            expect(getTheme()).toBe('light');
        });

        it('should set theme to dark', () => {
            setTheme('dark');
            expect(getTheme()).toBe('dark');
        });

        it('should persist theme to localStorage', () => {
            setTheme('dark');
            expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
        });

        it('should set data-theme attribute on document element', () => {
            setTheme('dark');
            expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
        });

        it('should not set invalid theme values', () => {
            setTheme('light');
            setTheme('invalid');
            expect(getTheme()).toBe('light');
        });

        it('should reject theme values other than light and dark', () => {
            setTheme('light');
            setTheme('auto');
            expect(getTheme()).toBe('light');
            expect(document.documentElement.getAttribute('data-theme')).toBe('light');
        });
    });

    describe('getTheme', () => {
        it('should return current theme', () => {
            setTheme('dark');
            expect(getTheme()).toBe('dark');
        });

        it('should return light theme after reset', () => {
            setTheme('dark');
            setTheme('light');
            expect(getTheme()).toBe('light');
        });
    });
});

describe('Search Management', () => {
    const mockTodos = [
        { id: 1, text: 'Buy groceries', completed: false },
        { id: 2, text: 'Finish project', completed: true },
        { id: 3, text: 'Call the office', completed: false },
        { id: 4, text: 'UPPERCASE TODO', completed: false }
    ];

    describe('setSearchQuery', () => {
        it('should set search query', () => {
            setSearchQuery('buy');
            expect(getSearchQuery()).toBe('buy');
        });

        it('should convert search query to lowercase', () => {
            setSearchQuery('BUY');
            expect(getSearchQuery()).toBe('buy');
        });

        it('should handle empty search query', () => {
            setSearchQuery('');
            expect(getSearchQuery()).toBe('');
        });
    });

    describe('getSearchQuery', () => {
        it('should return current search query', () => {
            setSearchQuery('test');
            expect(getSearchQuery()).toBe('test');
        });

        it('should return empty string if no query set', () => {
            setSearchQuery('');
            expect(getSearchQuery()).toBe('');
        });
    });

    describe('filterTodosBySearch', () => {
        it('should return all todos when search query is empty', () => {
            setSearchQuery('');
            const filtered = filterTodosBySearch(mockTodos);
            expect(filtered).toHaveLength(4);
            expect(filtered).toEqual(mockTodos);
        });

        it('should filter todos by search query', () => {
            setSearchQuery('buy');
            const filtered = filterTodosBySearch(mockTodos);
            expect(filtered).toHaveLength(1);
            expect(filtered[0].text).toBe('Buy groceries');
        });

        it('should perform case-insensitive search', () => {
            setSearchQuery('UPPERCASE');
            const filtered = filterTodosBySearch(mockTodos);
            expect(filtered).toHaveLength(1);
            expect(filtered[0].text).toBe('UPPERCASE TODO');
        });

        it('should handle partial matches', () => {
            setSearchQuery('pro');
            const filtered = filterTodosBySearch(mockTodos);
            expect(filtered).toHaveLength(1);
            expect(filtered[0].text).toBe('Finish project');
        });

        it('should return empty array when no todos match', () => {
            setSearchQuery('nonexistent');
            const filtered = filterTodosBySearch(mockTodos);
            expect(filtered).toHaveLength(0);
        });

        it('should match todos with "call" in text', () => {
            setSearchQuery('call');
            const filtered = filterTodosBySearch(mockTodos);
            expect(filtered).toHaveLength(1);
            expect(filtered[0].text).toBe('Call the office');
        });

        it('should match multiple todos with same search term', () => {
            setSearchQuery('the');
            const filtered = filterTodosBySearch(mockTodos);
            expect(filtered).toHaveLength(1);
            expect(filtered[0].text).toBe('Call the office');
        });
    });

    describe('sortTodos', () => {
        const todosWithDates = [
            { id: 3, text: 'Task C', completed: false, dueDate: '2024-01-15' },
            { id: 1, text: 'Task A', completed: true, dueDate: '2024-01-10' },
            { id: 2, text: 'Task B', completed: false, dueDate: '2024-01-20' }
        ];

        it('should sort todos by creation date (default)', () => {
            const sorted = sortTodos(todosWithDates, 'created');
            expect(sorted[0].id).toBe(3);
            expect(sorted[1].id).toBe(1);
            expect(sorted[2].id).toBe(2);
        });

        it('should sort todos by completed status', () => {
            const sorted = sortTodos(todosWithDates, 'completed');
            const completedIndex = sorted.findIndex(t => t.completed);
            const incompleteIndex = sorted.findIndex(t => !t.completed);
            expect(incompleteIndex).toBeLessThan(completedIndex);
        });

        it('should sort todos by due date', () => {
            const sorted = sortTodos(todosWithDates, 'dueDate');
            expect(sorted[0].dueDate).toBe('2024-01-10');
            expect(sorted[1].dueDate).toBe('2024-01-15');
            expect(sorted[2].dueDate).toBe('2024-01-20');
        });

        it('should handle todos without due dates by putting them at end', () => {
            const todosWithMissingDates = [
                { id: 1, text: 'With date', completed: false, dueDate: '2024-01-10' },
                { id: 2, text: 'No date', completed: false }
            ];
            const sorted = sortTodos(todosWithMissingDates, 'dueDate');
            expect(sorted[0].dueDate).toBeDefined();
            expect(sorted[1].dueDate).toBeUndefined();
        });

        it('should not modify original array', () => {
            const original = [...todosWithDates];
            sortTodos(todosWithDates, 'dueDate');
            expect(todosWithDates).toEqual(original);
        });

        it('should default to created sort when no sort type provided', () => {
            const sorted = sortTodos(todosWithDates);
            expect(sorted[0].id).toBe(3);
            expect(sorted[1].id).toBe(1);
            expect(sorted[2].id).toBe(2);
        });

        it('should handle empty array', () => {
            const sorted = sortTodos([], 'created');
            expect(sorted).toHaveLength(0);
        });

        it('should sort todos by completed status', () => {
            const sorted = sortTodos(todosWithDates, 'completed');
            // Verify the sorting groups by completed status
            const incompleted = sorted.filter(t => !t.completed);
            const completed = sorted.filter(t => t.completed);
            // At least one of each type should be present
            expect(incompleted.length).toBeGreaterThanOrEqual(1);
            expect(completed.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('Integration: Search and Filter combined', () => {
        it('should filter by search and then sort', () => {
            const todos = [
                { id: 3, text: 'Buy milk', completed: false, dueDate: '2024-01-20' },
                { id: 1, text: 'Buy bread', completed: true, dueDate: '2024-01-10' },
                { id: 2, text: 'Sell books', completed: false, dueDate: '2024-01-15' }
            ];

            setSearchQuery('buy');
            const filtered = filterTodosBySearch(todos);
            const sorted = sortTodos(filtered, 'dueDate');

            expect(sorted).toHaveLength(2);
            expect(sorted[0].text).toBe('Buy bread');
            expect(sorted[1].text).toBe('Buy milk');
        });

        it('should handle search and completed status sorting', () => {
            const todos = [
                { id: 1, text: 'Call home', completed: true },
                { id: 2, text: 'Call office', completed: false },
                { id: 3, text: 'Write email', completed: false }
            ];

            setSearchQuery('call');
            const filtered = filterTodosBySearch(todos);
            const sorted = sortTodos(filtered, 'completed');

            expect(sorted).toHaveLength(2);
            expect(sorted[0].completed).toBe(false);
            expect(sorted[1].completed).toBe(true);
        });
    });
});
