// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class EntityService<E extends { id: string }, U, P> {
  private dataStore: E[] = [];

  constructor(private name: string, private entity: any) {}

  findAll(): E[] {
    return this.dataStore;
  }

  findBy(key: string, value: any): E | undefined {
    return this.dataStore.find(d => d[key] === value);
  }

  filterBy(key: string, value: any): E[]  {
    return this.dataStore.filter(d => d[key] === value);
  }

  findById(uuid: string): E | undefined {
    return this.findBy('id', uuid);
  }

  findIndexById(uuid: string): number | undefined {
    const index = this.dataStore.findIndex(d => d.id === uuid);
    return index === -1 ? undefined : index;
  }

  upsert(data: U | P, uuid?: string): E {
    if (!uuid) {
      // create

      const newRecord = this.entity.factory(data);
      this.dataStore.push(newRecord);
      return newRecord;
    } else {
      // update

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
  }

  remove(uuid: string): E {
    const existintRecordIndex = this.findIndexById(uuid);
    if (!existintRecordIndex)
      throw new NotFoundException('Existing record is not found!');

    const deletedRecord = this.dataStore.splice(existintRecordIndex);

    return deletedRecord[0];
  }
}
