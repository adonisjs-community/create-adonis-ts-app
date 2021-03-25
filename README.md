<div align="center">
  <img src="https://res.cloudinary.com/adonisjs/image/upload/q_100/v1558612869/adonis-readme_zscycu.jpg" width="600px">
</div>

<br />

<div align="center">

[![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url] [![synk-image]][synk-url]

</div>

<br />


# Create AdonisJS App
> AdonisJS Typescript starter template

This is the official starter template to create AdonisJS applications. You can choose between one of the following boilerplates

- **api**: Project structure + dependencies tailored for creating a REST API server.
- **web**: Traditional web application with server rendered templates and pre-configured support for sessions.
- **slim**: A smallest possible AdonisJS application. Still way powerful and feature rich then an Express application.

## Creating a new app

```sh
npm init adonis-ts-app hello-world
```

Yarn users

```sh
yarn create adonis-ts-app hello-world
```

![](assets/create-adonis-ts-app.gif)

## Options

Execute the following command to see the help output and available options

```sh
npm init adonis-ts-app
```

```
    _       _             _         _     
   / \   __| | ___  _ __ (_)___    | |___ 
  / _ \ / _` |/ _ \| '_ \| / __|_  | / __|
 / ___ \ (_| | (_) | | | | \__ \ |_| \__ \
/_/   \_\__,_|\___/|_| |_|_|___/\___/|___/

npm init adonis-ts-app <project-name>

Options
--boilerplate [api, web, slim]    Select the project boilerplate
--name <string>                   Specify application name
--eslint <boolean>                Enable/disable eslint setup
--prettier <boolean>              Enable/disable prettier setup
--encore <boolean>                Enable/disable encore setup
--debug <boolean>                 Turn on the debug mode
```

#### boilerplate

Choose the boilerplate by passing the flag

```sh
npm init adonis-ts-app hello-world --boilerplate=web
```

#### name

Define the application name. The `name` property inside the `package.json` file will reflect this value

```sh
npm init adonis-ts-app hello-world --boilerplate=my-app
```

#### eslint

Configure eslint

```sh
npm init adonis-ts-app hello-world --eslint
```

#### prettier

Configure prettier

```sh
npm init adonis-ts-app hello-world --prettier
```

#### encore

Configure encore

```sh
npm init adonis-ts-app hello-world --encore
```

#### debug

Debug the project creation process. This flag will use the verbose output for better debugging experience.

```sh
npm init adonis-ts-app hello-world --debug
```

<div align="center">
  <sub>Built with ❤︎ by <a href="https://github.com/thetutlage">Harminder Virk</a>
</div>

[npm-image]: https://img.shields.io/npm/v/create-adonis-ts-app/latest.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/create-adonis-ts-app/v/alpha "npm"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript

[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/adonisjs-community/create-adonis-ts-app?style=for-the-badge

[synk-image]: https://img.shields.io/snyk/vulnerabilities/github/adonisjs-community/create-adonis-ts-app?label=Synk%20Vulnerabilities&style=for-the-badge
[synk-url]: https://snyk.io/test/github/adonisjs-community/create-adonis-ts-app?targetFile=package.json "synk"
