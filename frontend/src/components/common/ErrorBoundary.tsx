import { Component, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          className="flex items-center justify-center min-h-[400px] p-8"
          role="alert"
          aria-live="assertive"
        >
          <div className="text-center max-w-md">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ background: 'var(--bg-accent)', border: '1px solid var(--border-color)' }}
            >
              <AlertTriangle size={32} style={{ color: 'var(--gn-pink)' }} />
            </div>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Something went wrong
            </h2>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              This section ran into a problem. Your data is safe — just try refreshing this part of the page.
            </p>
            {this.state.error && (
              <p className="text-xs mb-4 p-3 rounded-lg font-mono" style={{ background: 'var(--bg-accent)', color: 'var(--text-secondary)' }}>
                {this.state.error.message}
              </p>
            )}
            <button
              onClick={this.handleReset}
              className="btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
