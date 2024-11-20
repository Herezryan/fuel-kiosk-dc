// import localFont from "next/font/local";
import "./globals.css";
import { MantineProvider, Center , Container} from "@mantine/core";
import '@mantine/core/styles.css';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Fuel Kiosk",
  description: "Oregon State University Transportation Motorpool Bulk Fuel Kiosk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      // Honestly no idea how else to center everything, change if you can lmao
        style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:"100dvw"}}
      >
        <MantineProvider defaultColorScheme="dark">
          {/* <Center>
            {children}
          </Center> */}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
