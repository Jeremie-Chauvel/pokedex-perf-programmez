import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script src="https://www.googletagmanager.com/gtag/js?id=G-9SW98FYM4Z"></script>
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9SW98FYM4Z');
        `}
      </Script>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
