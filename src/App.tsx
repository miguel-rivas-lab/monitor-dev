import "./App.css";
import { FC } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App: FC = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </div>
  );
};
