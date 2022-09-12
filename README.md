# DrivenPass

## Rota POST /signup

Rota de criação de usuário

Essa rota espera um body no formato:
```
{
    email: "qualqueremail@gmail.com", // string contendo um email valido
    password "12345678ab" // string com no minimo 10 caracteres
}
```
## Rota POST /signin

Esta é a rota de login 

Essa rota espera um body no mesmo formato do cadastrado:
```
{
    email: "qualqueremail@gmail.com", // string contendo um email valido
    password "12345678ab" // string com no minimo 10 caracteres
}
```

Atenção, esta rota devolve como resposta um TOKEN, que deverá ser usado como para validação em todas as próximas rotas

## Rota POST /credential

Esta rota cria uma credencial para um usuário logado, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

No body é preciso enviar um objeto no formato:
```
{ 
    title: "Titulo", // string, não podendo ser igual a outro titulo cadastrado por este mesmo usuário
    url: "https://www.google.com", // string contendo uma url valida
    username: "Qualquer Nome", // string qualquer representando o nome do usuario
    password: "Senha qualquer", // string qualquer representando a senha do usuario
}
```

## Rota GET /credentials 

Essa rota envia todas as credenciais do usuário que esta requerindo, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

A resposta é enviada no seguinte formato:
```
[
  {
    "id": 10,
    "userId": 2,
    "url": "https://www.google.com",
    "title": "titulo unico",
    "username": "Qualquer Nome",
    "password": "123456778a"
  },
  {
    "id": 11,
    "userId": 2,
    "url": "https://www.google.com",
    "title": "titulo unicov2",
    "username": "Qualquer Nome",
    "password": "123456778a"
  }
]
```
Lembrando que as senhas são criptografadas quando enviadas para o banco de dados, mas são descriptografadas nesta rota para enviar ao usuário

## Rota GET /credential/:id 

Essa rota serve para enviar uma credencial especifica a um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id da credencial desejada, lembrando que é necessario que a credencial seja do mesmo usuário que forneceu o TOKEN

A resposta segue o formato: 
```
{
    "id": 11,
    "userId": 2,
    "url": "https://www.google.com",
    "title": "titulo unicov2",
    "username": "Qualquer Nome",
    "password": "123456778a"
}
```

## Rota DELETE /credential/:id

Essa rota serve para deletar uma credencial especifica de um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id da credencial que se deseja deletar, lembrando que é necessario que a credencial seja do mesmo usuário que forneceu o TOKEN

Caso delete com sucesso devolve o status: 200

## Rota POST /notes

Esta rota cria uma nota para um usuário logado, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

No body é preciso enviar um objeto no formato:
```
{
  title: "Qualquer string com até 50 caracteres", // Um usuario não pode ter mais de uma nota com o mesmo titulo
  note: "Qualquer string com até 1000 caracteres"
})
```

## Rota GET /notes

Essa rota envia todas as notas do usuário que esta requerindo, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

A resposta é enviada no seguinte formato:
```
[
  {
    "id": 4,
    "userId": 2,
    "title": "qualquer titulo com ate 50 caracteres",
    "note": "qualquer texto com ate 1000 carecteres"
  },
  {
    "id": 5,
    "userId": 2,
    "title": "qualquer titulo com ate 50 caracteresv2",
    "note": "qualquer texto com ate 1000 carecteres"
  }
]
```

## Rota GET /note/:id 

Essa rota serve para enviar uma nota especifica a um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id da nota desejada, lembrando que é necessario que a nota seja do mesmo usuário que forneceu o TOKEN

A resposta segue o formato: 
```
{
    "id": 4,
    "userId": 2,
    "title": "qualquer titulo com ate 50 caracteres",
    "note": "qualquer texto com ate 1000 carecteres"
}
```

## Rota DELETE /note/:id

Essa rota serve para deletar uma nota especifica de um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id da nota que se deseja deletar, lembrando que é necessario que a nota seja do mesmo usuário que forneceu o TOKEN

Caso delete com sucesso devolve o status: 200

## Rota POST /card

Esta rota cadastra um cartão para um usuário logado, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

No body é preciso enviar um objeto no formato:
```
{
  title: "titulo unico", // Titulo unico, um usuário não pode ter mais de um cartão com o mesmo titulo
  number: "1234123412341234", // string de 16 caracterese, sendo todos numeros
  name: "NOME ESCRITO NO CARTÃO",
  cvc: "123", // string de 3 caracteres, sendo todos numeros
  expirationDate: "12/09", // string da data de validade, no formato DD/MM
  password: "1234", // string de 4 caracterese, todos numeros
  isVirtual: false, // bolean indicando se o cartão é virtual ou não
  type: "crédito", // string, podendo ser somente "crédito", débito" ou "ambos"
}
```

## Rota GET /cards

Essa rota envia todas os cartões do usuário que esta requerindo, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

A resposta é enviada no seguinte formato:
```
[
  {
    "id": 3,
    "userId": 2,
    "title": "titulo unico do cartão",
    "number": "1234123412341234",
    "name": "Qualquer Nome",
    "cvc": "212",
    "expirationDate": "12/09",
    "password": "1209",
    "type": "crédito",
    "isVirtual": false
  },
  {
    "id": 4,
    "userId": 2,
    "title": "titulo unico do cartãov2",
    "number": "1234123412341234",
    "name": "Qualquer Nome",
    "cvc": "212",
    "expirationDate": "12/09",
    "password": "1209",
    "type": "crédito",
    "isVirtual": false
  }
]
```
Lembrando que as senhas e o cvc são criptografados quando enviadas para o banco de dados, mas são descriptografados nesta rota para enviar ao usuário
## Rota GET /card/:id 

Essa rota serve para enviar um cartão especifico a um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id do cartão desejado, lembrando que é necessario que o cartão seja do mesmo usuário que forneceu o TOKEN

A resposta segue o formato: 
```
{
    "id": 3,
    "userId": 2,
    "title": "titulo unico do cartão",
    "number": "1234123412341234",
    "name": "Qualquer Nome",
    "cvc": "212",
    "expirationDate": "12/09",
    "password": "1209",
    "type": "crédito",
    "isVirtual": false
}
```

## Rota DELETE /card/:id

Essa rota serve para deletar um cartão especifica do cadastro de um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id do cartão que se deseja deletar, lembrando que é necessario que o cartão seja do mesmo usuário que forneceu o TOKEN

Caso delete com sucesso devolve o status: 200

## Rota POST /wifis

Esta rota cadastra um wi-fi para um usuário logado, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

No body é preciso enviar um objeto no formato:
```
{
  title: "titulo do wifi", // String, neste caso pode haver mais de um wifi para o mesmo titulo
  name: "nome do wifi", // String
  password: "senha do wifi", // String
}
```

## Rota GET /wifis

Essa rota envia todos os Wi-fis cadastrados do usuário que esta requerindo, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin

A resposta é enviada no seguinte formato:
```
[
  {
    "id": 7,
    "userId": 2,
    "title": "Titulo do wifi que pode repetir",
    "name": "Nome do wifi",
    "password": "Senha do wifi"
  },
  {
    "id": 8,
    "userId": 2,
    "title": "Titulo do wifi que pode repetir",
    "name": "Nome do wifi",
    "password": "Senha do wifi"
  }
]
```
Lembrando que as senhas são criptografadas quando enviadas para o banco de dados, mas são descriptografadas nesta rota para enviar ao usuário
## Rota GET /wifi/:id 

Essa rota serve para enviar um Wi-fi especifico a um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id do Wi-fi desejada, lembrando que é necessario que o Wi-fi seja do mesmo usuário que forneceu o TOKEN

A resposta segue o formato: 
```
{
    "id": 7,
    "userId": 2,
    "title": "Titulo do wifi que pode repetir",
    "name": "Nome do wifi",
    "password": "Senha do wifi"
}
```

## Rota DELETE /wifi/:id

Essa rota serve para deletar um wi-fi especifico do cadastro de um usuário, ela espera um Header no formato Bearer TOKEN, com o Token enviado ao usuario na rota de signin, além de receber como parametro o id do wi-fi que se deseja deletar, lembrando que é necessario que o wi-fi seja do mesmo usuário que forneceu o TOKEN

Caso delete com sucesso devolve o status: 200