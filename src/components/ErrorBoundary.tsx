import { Component, ErrorInfo, ReactNode } from "react";
import { COLORS } from "../config/consts";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                        backgroundColor: COLORS.Black,
                        color: "white",
                        padding: "20px",
                        textAlign: "center",
                    }}
                >
                    <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>
                        Something went wrong
                    </h1>
                    <p style={{ marginBottom: "24px", color: COLORS.Grey }}>
                        {this.state.error?.message || "An unexpected error occurred"}
                    </p>
                    <button
                        onClick={this.handleReload}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: COLORS.Green,
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
