import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('/tasks')
// @ApiTags('users') comando para criar grupo na documentação usar em design diferente do padrão do nestjs.
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    @ApiOperation({ summary: 'Get all tasks' })
    @ApiResponse({ status: 200, description: 'Return all tasks' })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    getAllTasks(@Query() query: any) {
        console.log(query)
        return this.tasksService.getTasks();
    }

    @Get('/:id')
    getTask(@Param('id') id: string) {
        console.log(id);
        return this.tasksService.getTask(parseInt(id))
    }

    @Post()
    // @UsePipes(new ValidationPipe())
    createTask(@Body() task: CreateTaskDTO) {
        return this.tasksService.createTask(task);
    }

    @Delete()
    removeTaks() {
        return 'Deletada a tarefa';
    }

    @Put()
    updateTask() {
        return 'atualizada a tarefa';
    }

    @Patch()
    patchTask() {
        return 'atualizada a tarefa'
    }

} 