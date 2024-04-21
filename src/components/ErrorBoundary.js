import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error("Error caught by ErrorBoundary:", error, errorInfo);
    }
  
    render() {

      if (this.state.hasError) {

        alert("Invalid Tree Data Structure use the Set Default to see the correct one")
        alert("Back to default state")
        this.props.onReset();
        return null;
      }
      
      return this.props.children; 
    }
  }

  export default ErrorBoundary