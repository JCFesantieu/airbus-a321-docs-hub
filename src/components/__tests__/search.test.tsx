// src/components/__tests__/search.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'; // Import act
import { Search } from '../search';
import { useRouter, usePathname } from 'next/navigation';
// import { docsConfig } from '@/config/docs'; // No longer needed directly here
import Fuse from 'fuse.js';
import { DocItem } from '@/lib/content-extractor'; // Import DocItem

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock docsConfig (still needed for Sidebar generation, but not directly used by Search component anymore for its items)
jest.mock('@/config/docs', () => ({
  docsConfig: {
    sidebarNav: [
      {
        title: 'Section 1',
        items: [
          { title: 'Doc A', href: '/doc-a' },
          { title: 'Doc B', href: '/doc-b' },
        ],
      },
      {
        title: 'Section 2',
        items: [
          { title: 'Doc C', href: '/doc-c' },
        ],
      },
    ],
  },
}));

// Create a shared mock function for Fuse.js search
const mockFuseSearch = jest.fn((pattern) => {
  if (pattern === 'Doc') {
    return [
      {
        item: { title: 'Doc A', section: 'Section 1', href: '/doc-a', page: 1, content: 'This is a snippet for Doc A with keyword.' },
        matches: [{ indices: [[23, 27]], key: 'content', value: 'This is a snippet for Doc A with keyword.' }],
      },
      {
        item: { title: 'Doc C', section: 'Section 2', href: '/doc-c', page: 3, content: 'Doc C content with keyword in it.' },
        matches: [{ indices: [[19, 23]], key: 'content', value: 'Doc C content with keyword in it.' }],
      },
    ];
  }
  return [];
});


// Mock Fuse.js
jest.mock('fuse.js', () => {
  const MockFuse = jest.fn().mockImplementation((list: DocItem[], options) => {
    // This constructor mock is called when new Fuse() is used
    return {
      search: mockFuseSearch, // Always return the SAME mockSearch
      list,
      options,
    };
  });
  return MockFuse; // Return the mocked constructor
});

describe('Search Component', () => {
  const mockPush = jest.fn();
  const mockSearchableDocs: DocItem[] = [ // Define a mock for searchableDocs prop
    { title: 'Doc A', section: 'Section 1', href: '/doc-a', page: 1, content: 'This is a snippet for Doc A with keyword.' },
    { title: 'Doc B', section: 'Section 1', href: '/doc-b', page: 2, content: 'Doc B content without keyword.' },
    { title: 'Doc C', section: 'Section 2', href: '/doc-c', page: 3, content: 'Doc C content with keyword in it.' },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/en/docs'); // Default locale for pathname
    mockPush.mockClear();
    mockFuseSearch.mockClear(); // Clear calls before each test
    (Fuse as jest.Mock).mockClear(); // Clear Fuse constructor calls
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear timers after each test to prevent interference
  });

  it('renders search input correctly', () => {
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    expect(screen.getByPlaceholderText('Search documentation...')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('updates query state on input change', () => {
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
  });

  it('displays search results when query matches', async () => {
    jest.useFakeTimers(); // Enable fake timers for this test
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    act(() => {
        fireEvent.change(input, { target: { value: 'Doc' } });
    });
    // For this test, also run timers so that search results appear
    act(() => {
        jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText('Doc A')).toBeInTheDocument();
      expect(screen.getByText('Doc C')).toBeInTheDocument();
    });
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    jest.useRealTimers(); // Restore real timers for this test
  });

  it('does not display search results when query is too short', async () => {
    jest.useFakeTimers(); // Enable fake timers for this test
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    act(() => {
        fireEvent.change(input, { target: { value: 'D' } }); // Query length < 2
    });
    act(() => {
        jest.runAllTimers(); // Ensure useEffect runs and clears results
    });

    expect(screen.queryByText('Doc A')).not.toBeInTheDocument();
    jest.useRealTimers(); // Restore real timers for this test
  });

  it('navigates to selected document on result click', async () => {
    jest.useFakeTimers(); // Enable fake timers for this test
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    act(() => {
        fireEvent.change(input, { target: { value: 'Doc' } });
    });
    act(() => {
        jest.runAllTimers();
    });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Doc A'));
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/en/doc-a');
    jest.useRealTimers(); // Restore real timers for this test
  });

  it('displays search results with snippet when query matches', async () => {
    jest.useFakeTimers(); // Enable fake timers for this test
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    act(() => {
        fireEvent.change(input, { target: { value: 'Doc' } });
    });
    act(() => {
        jest.runAllTimers();
    });

    await waitFor(() => {
      // Expect the full content from the mock data, as getSnippet doesn't truncate much for short content
      expect(screen.getByText('This is a snippet for Doc A with keyword.')).toBeInTheDocument();
      expect(screen.getByText('Doc C content with keyword in it.')).toBeInTheDocument();
    });
    jest.useRealTimers(); // Restore real timers for this test
  });

  it('navigates results with Up/Down arrow keys', async () => {
    jest.useFakeTimers(); // Enable fake timers for this test
    render(<Search searchableDocs={mockSearchableDocs} />);
    const input = screen.getByPlaceholderText('Search documentation...');
    act(() => {
        fireEvent.change(input, { target: { value: 'Doc' } });
    });
    act(() => {
        jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText('Doc A')).toBeInTheDocument();
      expect(screen.getByText('Doc C')).toBeInTheDocument();
    });

    const docAButton = screen.getByText('Doc A').closest('button');
    const docCButton = screen.getByText('Doc C').closest('button');

    // Simulate pressing Down arrow - initially nothing is active, or first item
    act(() => { // Wrap state update in act
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    });
    expect(docAButton).toHaveClass('focused-result'); // Expect custom class for focused item

    act(() => { // Wrap state update in act
      fireEvent.keyDown(input, { key: 'ArrowDown' }); // Move to next item
    });
    expect(docCButton).toHaveClass('focused-result');

    act(() => { // Wrap state update in act
      fireEvent.keyDown(input, { key: 'ArrowUp' }); // Move back up
    });
    expect(docAButton).toHaveClass('focused-result');
    jest.useRealTimers(); // Restore real timers for this test
  });

  it('selects result with Enter key', async () => {
    jest.useFakeTimers(); // Enable fake timers for this test
    render(<Search searchableDocs={mockSearchableDocs} />);
    const input = screen.getByPlaceholderText('Search documentation...');
    act(() => {
        fireEvent.change(input, { target: { value: 'Doc' } });
    });
    act(() => {
        jest.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText('Doc A')).toBeInTheDocument();
    });

    // Press Down to select the first item
    act(() => { // Wrap state update in act
      fireEvent.keyDown(input, { key: 'ArrowDown' });
    });

    // Press Enter to select the active item
    act(() => { // Wrap state update in act
      fireEvent.keyDown(input, { key: 'Enter' });
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/en/doc-a'); // Expect navigation
    jest.useRealTimers(); // Restore real timers for this test
  });

  // New test case for debouncing search input
  it('debounces search input', async () => {
    jest.useFakeTimers(); // Enable fake timers for this test
    render(<Search searchableDocs={mockSearchableDocs} />);
    const input = screen.getByPlaceholderText('Search documentation...');

    // Simulate rapid typing within act
    act(() => {
      fireEvent.change(input, { target: { value: 'D' } });
      fireEvent.change(input, { target: { value: 'Do' } });
      fireEvent.change(input, { target: { value: 'Doc' } });
    });

    expect(mockFuseSearch).not.toHaveBeenCalled(); // Use the shared mock

    // Give React a moment to process state updates before advancing timers
    await Promise.resolve(); // Allow microtasks to run

    // Advance all timers immediately
    await act(async () => { // Use await act(async () => ...)
      jest.runAllTimers(); // Run all pending timers
    });

    console.log('mockFuseSearch.mock.calls:', mockFuseSearch.mock.calls); // Debug log

    await waitFor(() => {
      expect(mockFuseSearch).toHaveBeenCalledTimes(1); // Use the shared mock
      expect(mockFuseSearch).toHaveBeenCalledWith('Doc');
    });

    jest.useRealTimers(); // Restore real timers for this test
  });
});
