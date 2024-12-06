import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TasksService {
    constructor(private readonly prismaService: PrismaService) { }

    getTasks() {
        return this.prismaService.task.findMany();
    }

    createTask(task: CreateTaskDTO) {
        return this.prismaService.task.create({
            data: {
                name: task.title,
                status: task.status
            }
        });
    }

    getTask(id: number) {
        const taskFound = this.prismaService.task.findUnique({
            where: {
                id
            }
        })

        if (!taskFound) {
            return new NotFoundException('tarefas não existe!');
        }

        return taskFound;
    }
}