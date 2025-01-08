import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import '../styles/styles.scss';
import StoreProvider from "@/store/StoreProvider";
import {AppHeader} from "@/components/AppHeader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // const PersistGate =  persistor?require("redux-persist/integration/react"):null;
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
            <AppHeader/>
            <div className={`p-4`}>
                {children}
            </div>
        </StoreProvider>
        </body>
        </html>
    );
}
