# Learning Nestjs

## Create Controller

`nest generate controller projects --no-spec` - comando para criar arquivo controladores sem o teste visto quando digitamos esse comando sem a fleg `--no-spec` ela cria automaticamente um arquivo de teste.


obs.: A palavra `generate` pode ser abreviado pela letra `g` e palavra `controller` por `co` 

## Create service

`nest g service projects --no-spec`- comando para criar arquivo service

nota.: a palavra service pode ser abreviada também pela letra `s`.


## Create Pipe

`nest g pipe hello/pipes/validateuser`- comando usado para criar pipe.

## Create Guards

`nest g guard /hello/guards/auth` - comando usado para criar guard.

## Create Middleware

`nest g middleware /projects/middleware/logger` - comando usado para criar middleware

## Create Resource
`nest g resource payments` - comando usado para que permite criar servce, controller, DTO,module de forma rapida.