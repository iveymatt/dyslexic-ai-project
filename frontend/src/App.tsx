import { AppProvider } from './context/AppContext';
import { AppRouter } from './AppRouter';
import { AuthGate } from './components/AuthGate';

function App() {
  return (
    <AppProvider>
      <AuthGate>
        <AppRouter />
      </AuthGate>
    </AppProvider>
  );
}

export default App;
