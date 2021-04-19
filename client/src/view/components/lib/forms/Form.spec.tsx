import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  object,
  string,
} from 'yup';
import Form from './Form';

it('initializes basic form', async () => {
  const Dummy = () => {
    const schema = object().shape({
      name: string().max(32),
    });

    return (
      <Form
        formName="Basic"
        buttonText="Submit"
        submissionCallback={ jest.fn() }
        fields={
          [
            {
              name: 'name',
              label: 'Name',
              helperText: 'Display name',
              required: true,
            },
          ]
        }
        schema={ schema }
        wasError={ false }
        wasSuccess={ false }
      />
    );
  };

  render(<Dummy />);

  // Field and button rendered
  const inputElement = screen.getByRole('textbox', {
    name: 'Name',
  });
  expect(inputElement).toBeDefined();
  expect(inputElement).toHaveValue('');
  expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
  expect(screen.getByText('Display name')).toBeDefined();

  // state change applied async so need to use delay
  await userEvent.type(inputElement, 'John', { delay: 1 });

  expect(await screen.findByRole('textbox', { name: 'Name' })).toHaveValue('John');
  userEvent.clear(screen.getByRole('textbox', { name: 'Name' }));

  // warning message if form validation failed
  await userEvent.type(inputElement, 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', { delay: 1 });

  expect(await screen.getByText('this must be at most 32 characters')).toBeDefined();
});

it('calls our callback on submit', async () => {
  const submissionFunc = jest.fn();
  const Dummy = ({ req, cb }: { req: boolean, cb: jest.Mock }) => {
    const schema = object().shape({
      name: string().max(32),
    });

    return (
      <Form
        formName="Basic"
        buttonText="Submit"
        submissionCallback={ cb }
        fields={
          [
            {
              name: 'name',
              label: 'Name',
              helperText: 'Display name',
              required: req,
            },
          ]
        }
        schema={ schema }
        wasError={ false }
        wasSuccess={ false }
      />
    );
  };

  const { rerender } = render(<Dummy req={ false } cb={ submissionFunc } />);

  // Simply submits
  const button = screen.getByRole('button', { name: 'Submit' });
  const input = screen.getByRole('textbox', { name: 'Name' });
  userEvent.click(button);

  expect(submissionFunc).toHaveBeenCalledTimes(1);

  // Calls with our form data
  await userEvent.type(input, 'Sasha', { delay: 1 });
  expect(await screen.findByRole('textbox', { name: 'Name' })).toHaveValue('Sasha');
  userEvent.click(button);
  expect(screen.getByText('Submitting...')).toBeDefined();

  expect(submissionFunc).toHaveBeenCalledWith({ name: 'Sasha' });

  // Required Field
  const disabledSubmission = jest.fn();
  rerender(<Dummy req cb={ disabledSubmission } />);
  expect(() => userEvent.click(button)).toThrow();
  fireEvent(screen.getByRole('form'), new Event('submit'));
  expect(disabledSubmission).toHaveBeenCalledTimes(0);
});

it('updates the button disabled state based on schema and input', async () => {
  const schema = object().shape({
    room: string().max(32),
  });

  const props = {
    formName: 'Basic',
    buttonText: 'Submit',
    submissionCallback: jest.fn(),
    schema,
    fields: [
      {
        name: 'room',
        label: 'Room Name',
        helperText: 'Optional room name',
        required: true,
      },
    ],
  };

  render(<Form { ...props } wasSuccess={ false } wasError={ false } />);

  const button = screen.getByRole('button', { name: 'Submit' });
  const input = screen.getByRole('textbox', { name: 'Room Name' });
  expect(button).toBeDisabled();
  await userEvent.type(input, 'Rami', { delay: 1 });
  expect(button).not.toBeDisabled();
});

it('updates button text based on success or error', () => {
  const schema = object().shape({
    room: string().max(32),
  });

  const props = {
    formName: 'Basic',
    buttonText: 'Submit',
    submissionCallback: jest.fn(),
    schema,
    fields: [
      {
        name: 'room',
        label: 'Room Name',
        helperText: 'Optional room name',
        required: true,
      },
    ],
  };

  // Default
  const { rerender } = render(<Form { ...props } wasSuccess={ false } wasError={ false } />);
  expect(screen.getByRole('button')).toHaveTextContent('Submit');

  // Success
  rerender(<Form { ...props } wasSuccess wasError={ false } />);
  expect(screen.getByRole('button')).toHaveTextContent('Success!');

  // Failure
  rerender(<Form { ...props } wasSuccess={ false } wasError />);
  expect(screen.getByRole('button')).toHaveTextContent('Error');
});
