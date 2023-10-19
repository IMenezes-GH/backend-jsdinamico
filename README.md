# Back-end: Projeto final JSDinâmico
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

Backend da resolução do projeto final de javascript dinâmico do programa <Primeiro código> da ADA, utilizando um servidor express, deploy na Vercel e conexão com um cluster no MongoDB Atlas.  

Para autenticação e autorização de usuário a API utiliza JWT e cookies. Endpoints com métodos em **negrito** precisam de um Bearer token para acesso autorizado.

## Endpoints:

**/**  <code>GET</code>  

**/login** <code>POST</code>    

**/user** <code>**GET**</code> <code>POST</code> <code>**PATCH**</code> <code>**DELETE**</code>  

**/user/:username** <code>**GET**</code>  

**/user/:username/tasks** <code>**GET**</code> <code>**POST**</code>   
