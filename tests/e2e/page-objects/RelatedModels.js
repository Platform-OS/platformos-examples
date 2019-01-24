import { Selector } from 'testcafe';

export default class RelatedModels {
  constructor() {
    this.link = {
      documentation: Selector('a').withText('Loading related models while avoiding n+1 queries. Increase speed 10x'),
      onlyProgrammers: Selector('a').withText('Only Programmers'),
      programmersCompaniesSlow: Selector('a').withText('Programmers + Companies: Slow'),
      programmersCompaniesCorrect: Selector('a').withText('Programmers + Companies: Correct')
    };
    this.data = {
      result: Selector(
        '.row > div > table.table.table-bordered.table-striped > tbody > tr:nth-of-type(4) > td:nth-of-type(2)'
      )
    };
  }
}
