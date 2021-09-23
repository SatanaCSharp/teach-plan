import { Model, AnyKeys } from 'mongoose';

export abstract class BaseService<CreateDto, UpdateDto, SchemaDocument> {
  protected constructor(private model: Model<SchemaDocument>) {}

  public async findAll(): Promise<SchemaDocument[]> {
    return this.model.find({}).exec();
  }

  public async findById(id: string): Promise<SchemaDocument> {
    return this.model.findById(id).exec();
  }

  public async create(
    createDto: Readonly<CreateDto> & AnyKeys<Readonly<CreateDto>>,
  ): Promise<SchemaDocument> {
    return this.model.create(createDto);
  }
  public createMany(
    createDtos: Array<Readonly<CreateDto> & AnyKeys<Readonly<CreateDto>>>,
  ): Promise<SchemaDocument[]> {
    return this.model.insertMany(createDtos);
  }
  public async update(
    id: string,
    updateDto: UpdateDto,
  ): Promise<SchemaDocument> {
    await this.model.findByIdAndUpdate(id, updateDto).exec();
    return this.findById(id);
  }

  public delete(id: string): Promise<SchemaDocument> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
