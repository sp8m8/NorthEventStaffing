import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import Staff from "@/pages/staff";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import JoinUs from "@/pages/join-us";
import StaffPortal from "@/pages/staff-portal";
import StaffRegistration from "@/pages/staff-registration";
import Packages from "@/pages/packages";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/staff" component={Staff} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/join-us" component={JoinUs} />
      <Route path="/staff-portal" component={StaffPortal} />
      <Route path="/staff-registration" component={StaffRegistration} />
      <Route path="/packages" component={Packages} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="container mx-auto flex min-h-screen flex-col px-4">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
