# ZUP Landing Page

Este repositório contém o código da landing page do projeto ZUP para instituições que ofereçam acesso público a algum
dos aplicativos da plataforma (Cidadão web ou Aplicativos Android e iOS). Um exemplo dessa página pode ser visualizado
no [site do projeto em São Bernardo do Campo](http://vcsbc.saobernardo.sp.gov.br/).

## Depedências

 - Node v0.10
 - Bower
 - Sass
 
## Instalação de dependências

### Node

Caso você tenha o [nvm](https://github.com/creationix/nvm) instalado, basta rodar:

```
nvm install
```

Do contrário, siga as instruções [no site oficial](https://nodejs.org/en/download/releases/) e garanta que ao executar
`node --version` a versão exibida seja a v0.10.

### Sass

É necessário que o pre-processador de CSS Sass esteja disponível em seu `PATH`. Para isso basta instalar o ruby 1.8+ e
rodar o seguinte comando:

```
gem install sass
```

### Bower

Caso você não possuo o Bower instalado, basta executar o seguinte comando: 

```
npm install -g bower
```

### Bibliotecas

Para instalar as dependências da aplicação, execute os seguintes comandos:

```
npm install
bower install
```

## Configuração

As seguintes variáveis de ambiente podem ser utilizadas para personalizar a landing page:

  - `CITY_NAME`: O nome da cidade exibido no texto do site.
  - `PAGE_TITLE`: O título da página que é exibido pelo navegador.
  - `APPLICATION_NAME`: O nome da aplicação. Caso sua cidade não tenha interesse em personalizar, basta colocar "ZUP".
  - `API_URL`: A URL pública da API do ZUP.
  - `IOS_APP_LINK`: Caso sua cidade disponibilize o aplicativo iOS para os munícipes, insira o link do aplicativo na App Store.
  - `ANDROID_APP_LINK`: Caso sua cidade disponibilize o aplicativo Android para os munícipes, insira o link do aplicativo na Play Store.
  - `WEB_APP_LINK`: Caso sua cidade disponibilize o aplicativo Cidadão Web, insira o link público para a aplicação.
  - `TERMS_AND_CONDITIONS_HTML`: Caso sua cidade possua um documento de termos de uso, insira o documento, formatado em HTML utilizando-se apenas de cabeçalhos (H1...H6), parágrafos (P) e quebras de linha (br).

Abaixo segue um exemplo de como você poderia injetar essas variáveis de configuração.

## Compilação para uso em produção

Para gerar o HTML final a ser utilizado em produção em um servidor web de sua preferência, execute o comando abaixo
inserindo as diretivas de configuração da seção acima:

```
NODE_ENV=production CITY_NAME=Minha\ Cidade API_URL=http://zup-api.minha-cidade.org.br ./prod_build.sh
```

## Ambiente de desenvolvimento

Para iniciar um servidor de desenvolvimento basta executar o seguinte comando:

```
gulp watch
```
