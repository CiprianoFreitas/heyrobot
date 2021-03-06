import Head from "next/head";

const CustomHead = () => (
  <Head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta
      name="description"
      content="Hey Robot is an application to play with your digital assistant"
    />
    <title>Hey Robot</title>

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#a65c83" />
    <meta name="msapplication-TileColor" content="#feff5f" />
    <meta name="theme-color" content="#feff5f" />
  </Head>
);

export default CustomHead;
