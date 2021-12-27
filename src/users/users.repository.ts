import { IUserRepository } from './users.repository.interface'
import { User } from './user.entity'
import { UserModel } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { PrismaService } from '../database/prisma.service'

@injectable()
export class UsersRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}
	async create({ name, email, password }: User): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		})
	}
	async find(email: string): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		})
	}
}
