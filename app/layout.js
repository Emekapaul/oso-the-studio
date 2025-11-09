import "./globals.css";
import { Inter } from "next/font/google";
import ConditionalLayout from "@/components/ConditionalLayout";
import { MediaProvider } from "@/contexts/MediaContext";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OsoTheStudio - Professional Photography",
  description:
    "Capturing life's most precious moments with artistic vision and professional excellence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MediaProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </MediaProvider>
      </body>
    </html>
  );
}
