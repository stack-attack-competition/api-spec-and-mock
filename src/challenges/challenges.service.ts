import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertChallengeDto } from './dto/upsert-challenge.dto';
import { PatchChallengeDto } from './dto/patch-challenge.dto';
import { Challenge } from './challenge';

@Injectable()
export class ChallengesService {
  data: Challenge[] = [];

  findAll() {
    return this.data;
  }

  findById(uuid: string) {
    return this.data.find(d => d.id === uuid);
  }

  findIndexById(uuid: string) {
    return this.data.findIndex(d => d.id === uuid);
  }

  upsert(data: UpsertChallengeDto | PatchChallengeDto, uuid?: string) {
    if (!uuid) {
      // create

      const newRecord = new Challenge(data);
      this.data.push(newRecord);
      return newRecord;
    } else {
      // update

      const existingRecordIndex = this.findIndexById(uuid);

      if (!existingRecordIndex)
        throw new NotFoundException('Existing record is not found!');

      const updatedRecord = new Challenge({
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
