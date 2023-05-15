import { describe, it } from "vitest";
import { render } from '@testing-library/react';
import { Title } from './title';

describe('App', () => {
  it('renders without crashing', () => {
    render(<Title />);
  });
});
