import {Injectable} from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class DateTimeService {
  minutesOfDayToTimestamp(minutes: number) {
    return moment().startOf('day').add(minutes, 'minutes').format('HH:mm');
  }
}
