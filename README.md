# Objetivo
Exibir e registrar visualmente dados de balanças Bluetooth.

# Observações
- O código foi projetado com base em uma balança específica que eu tenho. Pode ser necessária engenharia reversa e alteração da forma como o código funciona para que outras balanças sejam suportadas.
- O código foi testado no **Chrome Dev** para **Android** com a flag **Experimental Web Platform features** habilitada em `chrome://flags`.
- A aplicação web pode exibir dados inesperados caso algum dispositivo Bluetooth LE nas redondezas anuncie exatamente um dado de fabricante (`manufacturerData`) com exatos 13 bytes. É dessa forma que minha balança funciona, e pode ser que outros dispositivos trabalhem com a mesma estrutura de dados.

# Motivação
- Os aplicativos que trabalham com essas balanças geralmente são aplicativos estrangeiros que dependem de autenticação, portanto, de conexão à internet. Esta aplicação web não depende de conexão à internet, muito menos de autenticações, tão somente de um browser (Chromium) que suporte as APIs HTML5 para trabalhar com Bluetooth LE.
- As APIs HTML5 para trabalhar com Bluetooth LE são divertidas e ainda estão sendo desenvolvidas.

# Requisitos
## Bibliotecas (NPM) 
Instale-as usando `npm install`.
- **Bootstrap**
- **jQuery**
## Ambiente
- **Chromium**: **Chrome Dev** ou possivelmente **Chrome Canary** (flag **Experimental Web Platform features** habilitada)
## Hardware
- Dispositivo (smartphone, tablet ou computador) **com adaptador Bluetooth**
- Balança Bluetooth