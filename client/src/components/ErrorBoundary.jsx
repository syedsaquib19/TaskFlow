import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props){ super(props); this.state = { hasError:false, error:null }; }
  static getDerivedStateFromError(error){ return { hasError:true, error }; }
  componentDidCatch(err, info){ console.error("[ErrorBoundary]", err, info); }
  render(){
    if(this.state.hasError){
      return (
        <div className="container py-10">
          <div className="card p-6">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <p className="opacity-80">{this.state.error?.message || "Unknown error"}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
