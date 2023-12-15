import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Track from './Track';

describe('Track Component', () => {
  const mockTrack = {
    name: 'Test Track',
    artists: [{ name: 'Test Artist' }],
    uri: 'testUri'
  };

  test('renders Track component with provided data', () => {
    render(<Track track={mockTrack} isInPlaylist={false} playlistId="123" />);

    expect(screen.getByText('Test Track')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });

  test('renders remove button when in playlist', () => {
    render(<Track track={mockTrack} isInPlaylist={true} playlistId="123" />);

    expect(screen.getByText('-')).toBeInTheDocument();
  });

  // Add more tests as needed
});
