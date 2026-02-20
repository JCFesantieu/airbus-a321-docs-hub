// src/components/__tests__/search.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from '../search';
import { useRouter, usePathname } from 'next/navigation';
import { docsConfig } from '@/config/docs';
import Fuse from 'fuse.js';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock docsConfig
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
  return jest.fn().mockImplementation((list, options) => {
    const mockSearch = jest.fn((pattern) => {
      if (pattern === 'Doc') {
        return [
          { item: { title: 'Doc A', section: 'Section 1', href: '/doc-a' } },
          { item: { title: 'Doc C', section: 'Section 2', href: '/doc-c' } },
        ];
      }
      return [];
    });
    return {
      search: mockSearch,
      list, // To allow inspecting the list Fuse was initialized with
      options, // To allow inspecting the options Fuse was initialized with
    };
  });
});

describe('Search Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/en/docs'); // Default locale for pathname
    mockPush.mockClear();
  });

  it('renders search input correctly', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText('Search documentation...')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument(); // Changed from 'textbox' to 'searchbox'
  });

  it('updates query state on input change', () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
  });

  it('displays search results when query matches', async () => {
    render(<Search />);
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
    render(<Search />);
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'D' } }); // Query length < 2

    expect(screen.queryByText('Doc A')).not.toBeInTheDocument();
  });

  it('navigates to selected document on result click', async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(input, { target: { value: 'Doc' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('Doc A'));
    });

    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/en/doc-a'); // Changed expectation to '/en/doc-a'
  });
});
