// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class EntityService<E extends { id: string; isDeleted: boolean }, C, U> {
  private dataStore: E[] = [];

  constructor(private name: string, private entity: any) {}

  findAll(showDeleted = false): E[] {
    return this.dataStore.filter(d => (showDeleted ? true : d.isDeleted));
  }

  findBy(key: string, value: any, showDeleted = false): E | undefined {
    return this.dataStore
      .filter(d => (showDeleted ? true : d.isDeleted))
      .find(d => d[key] === value);
  }

  filterBy(key: string, value: any, showDeleted = false): E[] {
    return this.dataStore
      .filter(d => (showDeleted ? true : d.isDeleted))
      .filter(d => d[key] === value);
  }

  findById(uuid: string, showDeleted = false): E | undefined {
    return this.findBy('id', uuid, showDeleted);
  }

  findIndexById(uuid: string, showDeleted = false): number | undefined {
    const index = this.dataStore
      .filter(d => (showDeleted ? true : d.isDeleted))
      .findIndex(d => d.id === uuid);
    return index === -1 ? undefined : index;
  }

  addRelatedUuid(entityUuid: string, key: keyof E, relatedUuid: string) {
    const existingEntity = this.findById(entityUuid);
    if (!existingEntity)
      throw new NotFoundException(
        `The specified data with uuid: ${entityUuid} does not exist in the ${this.name}`,
      );

    if (!existingEntity[key])
      throw new BadRequestException(
        `The specified ${key} with uuid: ${entityUuid} does not exist in the ${this.name}`,
      );

    const entityProp = existingEntity[key];
    if (!Array.isArray(entityProp)) {
      throw new BadRequestException(
        `The specified ${key} with uuid: ${entityUuid} is not a relation type (array) on ${this.name}`,
      );
    }

    if (!entityProp.some(u => u === relatedUuid)) entityProp.push(relatedUuid);

    return relatedUuid;
  }

  removeRelatedUuid(entityUuid: string, key: keyof E, relatedUuid: string) {
    const existingEntity = this.findById(entityUuid);
    if (!existingEntity)
      throw new NotFoundException(
        `The specified data with uuid: ${entityUuid} does not exist in the ${this.name}`,
      );

    if (!existingEntity[key])
      throw new BadRequestException(
        `The specified ${key} with uuid: ${entityUuid} does not exist in the ${this.name}`,
      );

    const entityProp = existingEntity[key];
    if (!Array.isArray(entityProp)) {
      throw new BadRequestException(
        `The specified ${key} with uuid: ${entityUuid} is not a relation type (array) on ${this.name}`,
      );
    }

    if (entityProp.some(u => u === relatedUuid)) {
      // @ts-ignore
      existingEntity[key] = entityProp.filter(u => u !== relatedUuid);
    }

    return relatedUuid;
  }

  create(data: C): E {
    const newRecord = this.entity.factory(data);
    this.dataStore.push(newRecord);
    return newRecord;
  }

  update(data: U, uuid: string): E {
    const existingRecordIndex = this.findIndexById(uuid);

    if (!existingRecordIndex)
      throw new NotFoundException('Existing record is not found!');

    const updatedRecord = this.entity.factory({
      ...this.findById(uuid),
      ...data,
    });

    this.dataStore[existingRecordIndex] = updatedRecord;
    return updatedRecord;
  }

  remove(uuid: string): E {
    const existintRecordIndex = this.findIndexById(uuid);
    if (!existintRecordIndex)
      throw new NotFoundException('Existing record is not found!');

    this.dataStore[existintRecordIndex].isDeleted = true;

    return this.dataStore[existintRecordIndex];
  }

  removeAll() {
    this.dataStore = [];
    return true;
  }

  loadData(data: E[]) {
    this.dataStore = data;
  }
}
