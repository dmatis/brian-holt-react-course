// mostly code from reactjs.org/docs/error-boundaries.html
import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = { hasError: false, redirect: false };
  public static getDerivedStateFromError(): Partial<IState> {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught an error", error, info);
  }
  public componentDidUpdate(): void {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }
  public render(): React.ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/" noThrow />;
    }

    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
