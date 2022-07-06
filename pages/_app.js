import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import ContextProvider from "../components/ContextProvider";

function Website({ Component, pageProps, router }) {
  return (
    <ContextProvider>
      <Component {...pageProps} key={router.route} />;
    </ContextProvider>
  );
}

export default Website;
