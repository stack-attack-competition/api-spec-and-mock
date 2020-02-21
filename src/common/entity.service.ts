// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Injectable, NotFoundException } from '@nestjs/common';

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
