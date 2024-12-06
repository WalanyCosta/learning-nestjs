import { Injectable } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {

    private projects = []

    getProjects(){
        return this.projects
    }

    createProject(project: CreateProjectDTO){
        this.projects.push({
            ...project,
            id: this.projects.length + 1
        })

        return project
    }
}
