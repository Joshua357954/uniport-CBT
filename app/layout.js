import Head from "next/head";

export const metadata = {
  title: "CBT-BOX",
  description: "CBT BOX - C.Sc Help Group (Built by Joshua Boyi)",
  icon:'/favicon.svg'
};

export default function RootLayout({ children }) {
  return (
    <html>
      <Head>   
        <title>CBT BOX - C.Sc Help Group (Built by Joshua Boyi)</title>
      </Head>

      <body>{children}</body>
    </html>
  );
}
