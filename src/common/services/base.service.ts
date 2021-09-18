import { Model, Document, AnyKeys } from 'mongoose';

export abstract class BaseService<CreateDto, UpdateDto, SchemaClassName> {
  protected constructor(private model: Model<SchemaClassName & Document>) {}

  public findAll = async (): Promise<SchemaClassName[]> => {
    return this.model.find({}).exec();
  };

  public findById = async (id: string): Promise<SchemaClassName> => {
    return this.model.findById(id).exec();
  };

  public create = async (
    createDto: Readonly<CreateDto> & AnyKeys<Readonly<CreateDto>>,
  ): Promise<SchemaClassName> => {
    return this.model.create(createDto);
  };
  public createMany(
    createDtos: Array<Readonly<CreateDto> & AnyKeys<Readonly<CreateDto>>>,
  ): Promise<SchemaClassName[]> {
    return this.model.insertMany(createDtos);
  }
  public update(id: string, updateDto: UpdateDto): Promise<SchemaClassName> {
    return this.model.findByIdAndUpdate(id, updateDto).exec();
  }

  public delete(id: string): Promise<SchemaClassName> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
