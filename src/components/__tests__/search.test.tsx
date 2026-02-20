// src/components/__tests__/search.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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


// Mock Fuse.js
jest.mock('fuse.js', () => {
  return jest.fn().mockImplementation((list: DocItem[], options) => {
    // The list will now be DocItem[]
    // The options will now include 'content' key
    const mockSearch = jest.fn((pattern) => {
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
    return {
      search: mockSearch,
      list,
      options,
    };
  });
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
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'Doc' } });

    await waitFor(() => {
      expect(screen.getByText('Doc A')).toBeInTheDocument();
      expect(screen.getByText('Doc C')).toBeInTheDocument();
    });
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('does not display search results when query is too short', async () => {
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'D' } }); // Query length < 2

    expect(screen.queryByText('Doc A')).not.toBeInTheDocument();
  });

  it('navigates to selected document on result click', async () => {
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'Doc' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Doc A'));
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/en/doc-a');
  });

  it('displays search results with snippet when query matches', async () => {
    render(<Search searchableDocs={mockSearchableDocs} />); // Pass prop
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'Doc' } });

    await waitFor(() => {
      // Expect the full content from the mock data, as getSnippet doesn't truncate much for short content
      expect(screen.getByText('This is a snippet for Doc A with keyword.')).toBeInTheDocument();
      expect(screen.getByText('Doc C content with keyword in it.')).toBeInTheDocument();
    });
  });

  it('navigates results with Up/Down arrow keys', async () => {
    render(<Search searchableDocs={mockSearchableDocs} />);
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'Doc' } });

    await waitFor(() => {
      expect(screen.getByText('Doc A')).toBeInTheDocument();
      expect(screen.getByText('Doc C')).toBeInTheDocument();
    });

    const docAButton = screen.getByText('Doc A').closest('button');
    const docCButton = screen.getByText('Doc C').closest('button');

    // Simulate pressing Down arrow - initially nothing is active, or first item
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(docAButton).toHaveClass('focused-result'); // Expect custom class for focused item

    fireEvent.keyDown(input, { key: 'ArrowDown' }); // Move to next item
    expect(docCButton).toHaveClass('focused-result');

    fireEvent.keyDown(input, { key: 'ArrowUp' }); // Move back up
    expect(docAButton).toHaveClass('focused-result');
  });

  it('selects result with Enter key', async () => {
    render(<Search searchableDocs={mockSearchableDocs} />);
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'Doc' } });

    await waitFor(() => {
      expect(screen.getByText('Doc A')).toBeInTheDocument();
    });

    // Press Down to select the first item
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    // Press Enter to select the active item
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/en/doc-a'); // Expect navigation
  });
});
