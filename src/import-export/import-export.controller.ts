import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { ChallengesService } from '../challenges/challenges.service';
import { BetsService } from '../bets/bets.service';
import { DbDto } from '../common/db.dto';

@ApiTags('__UTIL__ import / export')
@Controller('import-export')
export class ImportExportController {
  constructor(
    private userSvc: UsersService,
    private challengeSvc: ChallengesService,
    private betSvc: BetsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Download the current state of the database.' })
  getDb() {
    return {
      users: this.userSvc.findAll(),
      challenges: this.challengeSvc.findAll(),
      bets: this.betSvc.findAll(),
    };
  }

  @Post()
  @ApiOperation({
    summary: `Load the data into the memory that is sent in the body. 
      (The example data is __not__ a valid data set) ‼️No data validation is done on these data!`,
    description: '‼️‼️‼️ Be careful: data set in here is used as is. No validation is performed! ‼️‼️‼️'
  })
  loadDb(@Body() data: DbDto) {
    this.userSvc.loadData(data['users'] || []);
    this.challengeSvc.loadData(data['challenges'] || []);
    this.betSvc.loadData(data['bets'] || []);

    return this.getDb();
  }
}
