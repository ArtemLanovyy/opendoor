import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { ListingsProvider } from './context/ListingsContext';
import { ListingsPanel } from './components/ListingsPanel/ListingsPanel';
import { Map } from './components/Map/Map';

function App() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>();

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  return (
    <ListingsProvider>
      <div className="min-h-screen min-w-[375px]">
        <Header />
        <div className="flex">
          <div className="hidden lg:block lg:w-[60%]">
            <Map selectedPropertyId={selectedPropertyId} onPropertyClick={handlePropertySelect} />
          </div>
          <div className="w-full lg:w-[40%] lg:border-l">
            <ListingsPanel
              selectedPropertyId={selectedPropertyId}
              onListingClick={handlePropertySelect}
            />
          </div>
        </div>
      </div>
    </ListingsProvider>
  );
}

export default App;
