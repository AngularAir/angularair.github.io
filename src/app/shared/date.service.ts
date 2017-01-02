import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  getWeekStartAndEndDateTimeUtc() {
    let curr = new Date;
    let first = curr.getDate() - curr.getDay();
    let last = first + 6;
    return {
      start: curr.setDate(first),
      end: curr.setDate(last)
    };
  }
}
