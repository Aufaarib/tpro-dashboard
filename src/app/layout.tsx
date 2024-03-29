"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ProgressLoader } from "nextjs-progressloader";
import AppProvider from "./(DashboardLayout)/components/shared/Context";
import "@/app/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>T-Pro Dashboard</title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap"
      rel="stylesheet"
    ></link> */}
      </head>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <AppProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <ProgressLoader />
            <CssBaseline />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
