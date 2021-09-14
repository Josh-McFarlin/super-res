import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import UnauthedNavigator from "./src/navigation/unauthed";

const loadResources = async () => {
  const assets = [require("./assets/icon.png")];

  const cacheAssets = assets.map((asset) =>
    Asset.fromModule(asset).downloadAsync()
  );

  return Promise.all(cacheAssets);
};

const App: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <AppLoading
        startAsync={loadResources}
        onFinish={() => setLoading(false)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <UnauthedNavigator />
    </NavigationContainer>
  );
};

export default App;
