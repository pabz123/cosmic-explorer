import { AuthProvider } from "./contexts/AuthContext";
import CosmicHero from "./components/CosmicHero";

export default function App() {
  return (
    <AuthProvider>
      <main className="min-h-screen w-full bg-black m-0 p-0 overflow-hidden">
        <CosmicHero />
      </main>
    </AuthProvider>
  );
}
