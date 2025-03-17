<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Algunos curls para probar local

# 📌 API de Recetas - Endpoints y cURL

## 🛠️ CRUD de Recetas con NestJS y MongoDB

---

## **📍 1. GET - Obtener todas las recetas**
```sh
curl -X GET http://localhost:3000/recipes
```

📌 **Ejemplo de Respuesta (JSON)**:
```json
[
  {
    "_id": "60c72b2f5f1b2c001c8e4d7a",
    "name": "Tarta de Manzana",
    "ingredients": ["Harina", "Manzana", "Azúcar", "Canela", "Manteca"],
    "steps": [
      { "description": "Precalentar el horno a 180°C" },
      { "description": "Preparar la masa", "imageUrl": "https://example.com/images/step1.jpg" }
    ],
    "imageUrls": ["https://example.com/images/tarta.jpg"],
    "userId": "12345"
  }
]
```

---

## **📍 2. GET - Obtener una receta por ID**
```sh
curl -X GET http://localhost:3000/recipes/60c72b2f5f1b2c001c8e4d7a
```

---

## **📍 3. POST - Crear una receta con varios pasos**
```sh
curl -X POST http://localhost:3000/recipes \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Tarta de Manzana",
           "ingredients": ["Harina", "Manzana", "Azúcar", "Canela", "Manteca"],
           "steps": [
             { "description": "Precalentar el horno a 180°C" },
             { "description": "Preparar la masa", "imageUrl": "https://example.com/images/step1.jpg" },
             { "description": "Cortar las manzanas", "imageUrl": "https://example.com/images/step2.jpg" },
             { "description": "Armar la tarta y hornear" }
           ],
           "imageUrls": ["https://example.com/images/tarta.jpg"],
           "userId": "12345"
         }'
```

📌 **Notas**:
- Se incluyen varios pasos (`steps`), algunos con imágenes (`imageUrl`).
- Se envía un **userId obligatorio**.

---

## **📍 4. PUT - Actualizar una receta (ejemplo: cambiar nombre)**
```sh
curl -X PUT http://localhost:3000/recipes/60c72b2f5f1b2c001c8e4d7a \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Tarta de Manzana Casera"
         }'
```

---

## **📍 5. PUT - Eliminar un paso de la receta**
```sh
curl -X PUT http://localhost:3000/recipes/60c72b2f5f1b2c001c8e4d7a \
     -H "Content-Type: application/json" \
     -d '{
           "steps": [
             { "description": "Precalentar el horno a 180°C" },
             { "description": "Preparar la masa", "imageUrl": "https://example.com/images/step1.jpg" },
             { "description": "Armar la tarta y hornear" }
           ]
         }'
```
📌 **Elimina el paso "Cortar las manzanas" simplemente omitiéndolo en la actualización.**

---

## **📍 6. DELETE - Eliminar una receta**
```sh
curl -X DELETE http://localhost:3000/recipes/60c72b2f5f1b2c001c8e4d7a
```

📌 **Borra la receta completamente de la base de datos.**

---

## 📜 **Notas Finales**
- 📌 **Reemplaza los IDs de ejemplo (`60c72b2f5f1b2c001c8e4d7a`) por IDs reales de tu base de datos.**
- 🚀 **Asegúrate de que el servidor esté corriendo antes de probar los endpoints.**
- 🔐 **Si usas autenticación, agrega el token en los headers con `-H "Authorization: Bearer <tu_token>"`.**


## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


