import { DoItAppPage } from './app.po';

describe('do-it-app App', () => {
  let page: DoItAppPage;

  beforeEach(() => {
    page = new DoItAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
