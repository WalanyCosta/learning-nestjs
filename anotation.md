# Learning Nestjs

## Create Controller

`nest generate controller projects --no-spec` - comando para criar arquivo controladores sem o teste visto quando digitamos esse comando sem a fleg `--no-spec` ela cria automaticamente um arquivo de teste.


obs.: A palavra `generate` pode ser abreviado pela letra `g` e palavra `controller` por `co`

### Validação

O nestjs nos da muitas opções para as validações, mas a recomendada é a biblioteca class-validation que permite vai com base em decoratores, diferente da libs como zod, yup e entre outros mais.

Exemplos de validação

```typescript

//tasks/dto/create-task.dto.ts
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDTO {
    @IsString()
    @MinLength(1)
    title: string

    @IsBoolean()
    @IsNotEmpty()
    status: boolean
}

```

E para com que essa validação seja feita é necessario addicionar `@UsePipes(new ValidationPipe())`

```typescript
//tasks/tasks.controller.ts
@Post()
@UsePipes(new ValidationPipe())
createTask(@Body() task: CreateTaskDTO) {
    return this.tasksService.createTask(task);
}

```
ou no arquivo `main.ts` adicionar o essa linha de codigo que está abaixo para validar de forma global sem ter de adicionar em cada rota.

```typescript

 app.useGlobalPipes(new ValidationPipe({
    //propriedade para excluir propriedade que não mencionada na validação
    whitelist: true
  }))

```

## Create service

`nest g service projects --no-spec`- comando para criar arquivo service

nota.: a palavra service pode ser abreviada também pela letra `s`.


## Create Pipe

Pipe: são middleware especifica do nestjs utilizado para converter ou transformar valores ou dados que vem da requisição. O nestjs já tem alguns pipes predifinidos dos mais comuns para valores primitivos como:

- ParseIntPipe
- ParseIntPipe e entre outros mais.

exemplos: 

```typescript

 @Get('ticket/:num')
    getNumber(@Param('num', ParseIntPipe) num: number){
        return num + 14;
    }

@Get('active/:status')
    getStatus(@Param('status', ParseBoolPipe) status: boolean){
        console.log(typeof(status))
        return status
    }

```

Mas podemos também criar os nosso proprios pipe como no exemplo abaixo.:

```typescript
//pipes/validateuser
import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateuserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value)

    const ageNumber = parseInt(value.age.toString(), 10);

    if(isNaN(ageNumber)){
      throw new HttpException('Age must be a number', HttpStatus.BAD_REQUEST)
    }

    return {...value, age: ageNumber};
  }
}

//hello.controller.ts

 @Get('greet')
    greet(@Query(ValidateuserPipe) query: {name: string, age: number}){
        console.log(typeof query.age)
        console.log(typeof query.name )
        return `Hello ${query.name}, you are ${query.age} years old`;
    }

```

`nest g pipe hello/pipes/validateuser`- comando usado para criar pipe.

Nota.: O pipe é uma funcionalidade semelhante a funcionalidade do laravel casts que tem a mesma funçao que a pipe.

## Create Guards

O um middleware do nestjs predefinido utilizado em cenários de authenticação, authorização e entre outros cenarios que envolve a questao de acesso indevidos que deve se cumprir uma regra ou paramentros. Ela por padrão já vem com o erro padrão como `forbbiden` ou `403`.

Exemplo.:

```typescript

//hello/guard/auth/auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    console.log(request.url)

    if (request.url === '/greet') return false

    return true
  }
}
```
E para inserir numa rota basta usar a seguinte expressão `@UseGuards(AuthGuard)`

```typescript

 @Get('greet')
    @UseGuards(AuthGuard)
    greet(@Query(ValidateuserPipe) query: {name: string, age: number}){
        console.log(typeof query.age)
        console.log(typeof query.name )
        return `Hello ${query.name}, you are ${query.age} years old`;
    }

```

`nest g guard /hello/guards/auth` - comando usado para criar guard.

## Create Middleware

Os middlewares no nestjs são sementes aos middlewares criados no express, a diferenciação na implementação. Os middlewares aqui no nestjs podem ser utilizado como desdes o cenario de capturação de error dependendo da arquictetura, authenticação, authorização por mas que já se tem recurso que fazem de jeito mais simple, e entre outros mais casos de uso.

exemplo.:

```typescript

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {

    console.log(req.originalUrl)

    next();
  }
}

```
E para implementar basta fazer isso.:

```typescript

import { ProjectsService } from './projects.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService]
})

export class ProjectsModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes( 
      {path: '/projects', method: RequestMethod.GET})
    .apply(AuthMiddleware).forRoutes({path: '/projects', method: RequestMethod.POST})
}

```

`nest g middleware /projects/middleware/logger` - comando usado para criar middleware

## Create Resource
`nest g resource payments` - comando usado para que permite criar servce, controller, DTO,module de forma rapida.

## create connection with prisma

O a documentação tem bom exemplos

## create documentation with swagger
