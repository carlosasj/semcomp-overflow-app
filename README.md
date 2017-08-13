# semcomp-overflow-app

## Como rodar

**Sempre que clicar em algum dos links, volte para o início da página e verifique se o SO e o Target estão corretos (geralmente SO Linux ou Windows, e Target Android)**

1. Siga [os passos para instalar o `react-native`, aba "Building Projects with Native Code"](https://facebook.github.io/react-native/docs/getting-started.html)
  - Node
  - The React Native CLI
  - Java Development Kit
  - Android development environment
  - Watchman (optional)
  
2. Siga [os passos para preparar o seu device](https://facebook.github.io/react-native/docs/getting-started.html#preparing-the-android-device)
3. [Instale o `yarn`](https://yarnpkg.com/en/docs/install) (porque instalar as dependências com ele é mais rápido e dá menos conflitos)
4. Na raiz do projeto, faça `yarn install` para instalar as dependências
5. Para construir o projeto basta fazer `react-native run-android` (pode ser necessário rodar esse comando algumas vezes antes de obter sucesso, ainda não descobri o motivo disso acontecer)

**Nota:** Este app está gastando muita bateria. Fique atento.
