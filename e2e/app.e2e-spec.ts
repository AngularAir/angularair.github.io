import { AngularairPage } from './app.po';

describe('angularair App', function() {
  let page: AngularairPage;

  beforeEach(() => {
    page = new AngularairPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
