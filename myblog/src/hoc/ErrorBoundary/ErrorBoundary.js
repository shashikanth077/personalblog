import React, { Component } from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMessage: error});
    }

    render() {
        if (this.state.hasError) {
          // Error path
          return (
            <div>
              <h2>Something went wrong.</h2>
              <details style={{ whiteSpace: 'pre-wrap' }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.hasError.componentStack}
              </details>
            </div>
          );
        }
        // Normally, just render children
        return this.props.children;
      }  
    }
export default ErrorBoundary;