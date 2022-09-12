# DrivenPass

## Rota POST /signup

Rota de criação de usuário

Essa rota espera um body no formato
```
{
    email: "qualqueremail@gmail.com", // string contendo um email valido
    password "12345678ab" // string com no minimo 10 caracteres
}
```
## Rota POST /signin