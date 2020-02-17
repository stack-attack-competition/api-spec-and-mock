import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertBetDto } from './dto/upsert-bet.dto';
import { PatchBetDto } from './dto/patch-bet.dto';
import { Bet } from './bet';

@Injectable()
export class BetsService {
  data: Bet[] = [];

  findAll() {
    return this.data;
  }

  findById(uuid: string) {
    return this.data.find(d => d.id === uuid);
  }

  findIndexById(uuid: string) {
    return this.data.findIndex(d => d.id === uuid);
  }

  upsert(data: UpsertBetDto | PatchBetDto, uuid?: string) {
    if (!uuid) {
      // create

      const newRecord = new Bet(data);
      this.data.push(newRecord);
      return newRecord;
    } else {
      // update

      const existingRecordIndex = this.findIndexById(uuid);

      if (!existingRecordIndex)
        throw new NotFoundException('Existing record is not found!');

      const updatedRecord = new Bet({
        ...this.findById(uuid),
        ...data,
      });

      this.data[existingRecordIndex] = updatedRecord;
      return updatedRecord;
    }
  }

  remove(uuid: string) {
    const existintRecordIndex = this.findIndexById(uuid);
    if (!existintRecordIndex)
      throw new NotFoundException('Existing record is not found!');

    const deletedRecord = this.data.splice(existintRecordIndex);

    return deletedRecord[0];
  }
}
