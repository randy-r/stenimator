import { newSpecPage } from '@stencil/core/testing';
import { ShiftHandler } from '../shift-handler';

describe('shift-handler', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ShiftHandler],
      html: `<shift-handler></shift-handler>`,
    });
    expect(page.root).toEqualHtml(`
      <shift-handler>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </shift-handler>
    `);
  });
});
