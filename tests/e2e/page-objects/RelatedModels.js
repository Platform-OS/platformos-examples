import { Selector } from 'testcafe';

export default class RelatedModels {
  constructor() {
    this.link = {
      documentation: Selector('a').withText(
        'Loading related models while avoiding n+1 queries. Increase speed 10x'
      ),
      onlyProgrammers: Selector('a').withText('Only Programmers'),
      programmersCompanies: Selector('a').withText(
        'Programmers + Companies: Slow'
      ),
      programmersCompaniesSlow: Selector('a').withText(
        'Programmers + Companies: Slow'
      ),
      programmersCompaniesCorrect: Selector('a').withText(
        'Programmers + Companies: Correct'
      ),
    };
    this.table = {
      companies: Selector(
        '.table.table-bordered.table-striped.scroll:nth-of-type(1) tbody > tr'
      ),
      benchmarkingResults: Selector(
        '.table.table-bordered.table-striped:nth-of-type(2) tbody > tr'
      ),
    };
  }
}
