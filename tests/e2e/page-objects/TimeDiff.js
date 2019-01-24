import { Selector } from 'testcafe';

export default class TimeDiff {
  constructor() {
    this.link = {
      documentation: Selector('a').withText('Measuring execution time of liquid code fragments (time_diff)')
    };
  }
}
