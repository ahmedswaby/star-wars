'useClient';

import "@/app/main.css";
import { Cairo } from "next/font/google";
import { ReduxProvider } from './storeProvider';

const cairo = Cairo({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="flex flex-col min-w-screen">
      <body className={cairo.className}><ReduxProvider>{children}</ReduxProvider></body>
    </html>
  );
}