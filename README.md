<div align="center">

<img src="./src/Assets/kruger-logo.png" height="120px">
<img src="./src/Assets/recipe.png" height="100px">

<h1>Cook Book App</h1>

<img src="https://img.shields.io/badge/MADEWITH-React-1572B6?style=for-the-badge&logo=React" height="30" />   

Busca, crea y guarda todas tus recetas en un solo lugar!

[View Demo](https://cookbook-kv-dc.vercel.app) | [Video](https://youtu.be/MKoJPXldkPA) | [Wireframe in Figma](https://www.figma.com/file/cHM2qY3UV7a6UgPYdqTjDA/Untitled?node-id=0%3A1&t=gpLIX2ZGd57g5eft-0)
</div>

## 馃専 About this project

En esta aplicaci贸n podr谩s buscar recetas de distintos autores y con distintos ingredientes.
Adem谩s, podr谩s almacenar tus propias recetas y armar una colecci贸n virtual con todas ellas.

<img src="./src/Assets/preview.png" height="300" /> 

## 馃洜 Built with

- HTML
- CSS
- JavaScript
- React.js
- Redux Toolkit
- Axios
- Firebase
- Tailwind CSS
- Vercel


## 馃憖 Prerequisites

Es necesario tener Git y Node.js instalado en tu computadora antes de instalar este proyecto.

## 馃弮 Run Locally

Clonar el repositorio

```bash
  git clone https://github.com/DaniCis/Recipes_Kruger
```

Ir al directorio del proyecto

```bash
  cd my-project
```

Instalar todas las dependencias

```bash
  npm install
```

Iniciar el servidor

```bash
  npm run start
```
Por defecto la aplicaci贸n se ejecutar谩 en tu navegador en https://localhost:3000

## 馃И Running Tests

Para ejecutar las pruebas de la aplicaci贸n, utilizar el siguiente comando

```bash
  npm run test
```


## 馃摐 API Reference

Para este proyecto se utiliz贸 una  [API gratuita](https://developer.edamam.com/recipe-demo) para buscar recetas de cocina.

#### Obtener todas las recetas

```http
  GET /api/recipes/v2
```

| Par谩metro | Tipo     | Descripci贸n                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Requerido**. Tu propia API key |

#### Obtener la informaci贸n de una receta en espec铆fico

```http
  GET /api/rcipes/v2/${id}
```

| Par谩metro | Tipo     | Descripci贸n                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Requerido**. Id de la receta a obtener|

Documentaci贸n completa de la API [aqu铆](https://developer.edamam.com/edamam-docs-recipe-api)

## 馃攽 Environment Variables

Para correr este proyecto, es necesario a帽adir las siguientes variables de entorno a tu archivo .env con la informaci贸n que te provea la API 

`REACT_APP_KEY` 

`REACT_API_ID` 

`REACT_API_URL` 

## Authors

馃懁 **Daniela Cisneros**

- GitHub: [@DaniCis](https://github.com/DaniCis)
- Twitter: [@DaniCisneros99](https://twitter.com/DaniCisneros99)

馃懁 **Kevin Veliz**
- Github: [@KevinVeliz](https://github.com/KevinVeliz)
- LinkedIn: [KevinVeliz](https://www.linkedin.com/in/kevin-veliz-b747a0206/)

## 馃拵 Acknowledgements

- [Sweet Alert 2](https://sweetalert2.github.io/)
- [Recipe Search Api](https://developer.edamam.com/recipe-demo)
- [Daisy UI](https://daisyui.com/)

## 馃 Contributing

[Juan Sotomayor](https://github.com/Juanse7793) - Tutor Frontend Kruger Star

## Show your support

Deja una 猸? si te ha gustado este proyecto!
