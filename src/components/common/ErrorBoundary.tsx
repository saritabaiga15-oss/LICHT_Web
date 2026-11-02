import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches rendering errors in a page so one broken component shows a recovery
 * message instead of blanking the whole site.
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode; resetKey?: string }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Page crashed:', error, info.componentStack);
  }

  componentDidUpdate(prevProps: { resetKey?: string }) {
    // Navigating to another page clears the error
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }} role="alert">
          <h1>Something went wrong on this page</h1>
          <p>Please refresh the page. If the problem continues, contact our team.</p>
          <a href="/" className="btn-pill-green" style={{ marginTop: '16px', display: 'inline-flex' }}>
            Back to home
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
