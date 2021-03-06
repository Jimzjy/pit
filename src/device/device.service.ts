import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Device, DeviceInput, DeleteResult } from 'src/graphql.schema'
import { DeviceModel } from './interfaces/device.interface'

@Injectable()
export class DeviceService {
  constructor(@InjectModel('Device') private readonly deviceModel: Model<DeviceModel>) {}

  async findOneById(id: string): Promise<Device> {
    return await this.deviceModel.findById(id)
  }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find()
  }

  async create(device: DeviceInput): Promise<Device> {
    return await this.deviceModel.create(device)
  }

  async delete(ids: string[]): Promise<DeleteResult> {
    return await this.deviceModel.deleteMany({ _id: { $in: ids } })
  }

  async update(id: string, data: DeviceInput): Promise<Device> {
    return await this.deviceModel.updateOne({ _id: id }, data)
  }
}
