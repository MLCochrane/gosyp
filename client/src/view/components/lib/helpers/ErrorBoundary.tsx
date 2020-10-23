import React, { Component, ReactNode } from 'react';

class ErrorBoundary extends Component<{
  errorDisplay?: ReactNode,
}, {
  hasError: boolean,
}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    const {
      hasError,
    } = this.state;

    const {
      children,
      errorDisplay,
    } = this.props;

    const toDisplay = () => errorDisplay || <h1>Something went wrong.</h1>;

    return hasError ? toDisplay() : children;
  }
}
export default ErrorBoundary;
