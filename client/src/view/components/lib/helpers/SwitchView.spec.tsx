import React, { useEffect, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SwitchView from './SwitchView';

it('renders current or next child based on prop', async () => {
  const ChildOne = () => <h1>Child One</h1>;
  const ChildTwo = () => <h1>Child Two</h1>;

  const { unmount } = render(<SwitchView
    trigger={ false }
    current={ ChildOne }
    next={ ChildTwo }
    useAnimation={ false }
  />);

  expect((await screen.findByRole('heading'))?.textContent).toBe('Child One');

  unmount();

  render(<SwitchView
    trigger
    current={ ChildOne }
    next={ ChildTwo }
    useAnimation={ false }
  />);

  expect((await screen.findByRole('heading'))?.textContent).toBe('Child Two');
});

it('switches from one component to the other if the prop changes', async () => {
  const ChildOne = () => <h1>Child One</h1>;
  const ChildTwo = () => <h1>Child Two</h1>;

  const Dummy = () => {
    const [trig, setTrig] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setTrig(true);
      }, 100);
    }, [setTrig]);

    return (
      <SwitchView
        trigger={ trig }
        current={ ChildOne }
        next={ ChildTwo }
        useAnimation
      />
    );
  };

  render(<Dummy />);
  expect((await screen.findByRole('heading'))?.textContent).toBe('Child One');

  await waitFor(() => {
    expect((screen.getByRole('heading')).textContent).toBe('Child Two');
  });
});
