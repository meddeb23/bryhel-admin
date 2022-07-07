import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import ContextProvider from "../components/ContextProvider";
import UserContextProvider from "../components/UserContext";

function Website({ Component, pageProps, router }) {
  return (
    <UserContextProvider>
      <ContextProvider>
        <Component {...pageProps} key={router.route} />;
      </ContextProvider>
    </UserContextProvider>
  );
}

export default Website;
