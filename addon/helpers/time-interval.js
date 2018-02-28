import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';
import { get } from '@ember/object';
import { capitalize } from '@ember/string';
import {
  timeMillisecond,
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeWeek,
  timeMonth,
  timeYear,
  timeSunday,
  timeMonday,
  timeTuesday,
  timeWednesday,
  timeThursday,
  timeFriday,
  timeSaturday
} from 'd3-time';
const INTERVALS = {
  timeMillisecond,
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeWeek,
  timeMonth,
  timeYear,
  timeSunday,
  timeMonday,
  timeTuesday,
  timeWednesday,
  timeThursday,
  timeFriday,
  timeSaturday
};

export function timeInterval([intervalName]) {
  let interval = get(INTERVALS, `time${capitalize(intervalName.toLowerCase())}`);
  assert(`${intervalName} is not a valid interval name.`, !!interval);
  return interval;
}

export default helper(timeInterval);
