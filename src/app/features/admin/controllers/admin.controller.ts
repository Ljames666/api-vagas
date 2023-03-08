import { Request, Response } from 'express';
import { HttpHelper } from '../../../shared/util/http.helper';
import { CreateAdminUseCase } from '../usecases/createAdmin.usecase';
import { UsuarioRepository } from '../../usuario/repositories/usuario.repository';

export class AdminController {
    public async create(req: Request, res: Response) {
        try {
            const usecase = new CreateAdminUseCase(new UsuarioRepository());
            const result = await usecase.execute(req.body);
            return HttpHelper.sucess(res, result, 'Admin criado com sucesso!');
        } catch (error: any) {
            return HttpHelper.serverError(res, error.toString());
        }
    }
}
