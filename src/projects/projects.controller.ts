import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-project.dto';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectsServices: ProjectsService){}

    @Get()
    getProjects(){
        return this.projectsServices.getProjects()
    }

    @Post()
    createProjects(@Body() project: CreateProjectDTO){
        return this.projectsServices.createProject(project)
    }
    
}
