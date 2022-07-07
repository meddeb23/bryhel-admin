import NextLink from "next/link";

const NotFound = () => {
  return (
    <div>
      <h1 as="h1">Not found</h1>
      <p>The page you&apos;re looking for was not found.</p>
      <NextLink href="/" passHref>
        Return to home
      </NextLink>
    </div>
  );
};

export default NotFound;
