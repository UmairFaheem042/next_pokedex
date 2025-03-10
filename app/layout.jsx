import "./globals.css";
import Header from "./_components/Header";

export const metadata = {
  title: "Pokédex using NextJs",
  description: "Explore pokemons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="caramellatte">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
