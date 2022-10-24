import { newE2EPage } from '@stencil/core/testing';

describe('shift-handler', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<shift-handler></shift-handler>');

    const element = await page.find('shift-handler');
    expect(element).toHaveClass('hydrated');
  });
});
