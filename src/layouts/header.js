import React, { useState } from "react";
import { TransitionProvider, TransitionViews } from "gatsby-plugin-transitions";
// Example Header-Component (see below)
import Header from "./header";

const Layout = ({ location, children }) => {
  return (
    <TransitionProvider
      location={location}
      mode="immediate"
      enter={{
        opacity: 0,
        transform: "translate3d(0,20vh,0) scale3d(1, 1, 1) rotate(0deg)",
        config: {
          mass: 1,
          tension: 210,
          friction: 20,
          clamp: true
        },
        onRest: () => {
          console.log("Hello, World!");
        }
      }}
      usual={{
        opacity: 1,
        transform: "translate3d(0vh,0vh,0) scale3d(1, 1, 1) rotate(0deg)"
      }}
      leave={{
        opacity: 0,
        transform: "translate3d(0vh,0vh,0) scale3d(2, 2, 1) rotate(180deg)",
        config: {
          duration: 1000
        }
      }}
    >
      // This Header is an example for a component, that should remain between routes
      <Header />
      <TransitionViews>
        {children}
      </TransitionViews>
    </TransitionProvider>
  );
};

export default Layout;