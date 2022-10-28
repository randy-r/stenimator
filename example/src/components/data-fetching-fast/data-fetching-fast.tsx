import { Component, Host, h, State } from '@stencil/core';
import { Stenimator } from 'stenimator';
import { delay } from '../../utils/delay';
import { CodeSection } from '../Code/CodeSection';

const dataList = [
  { id: 1, name: 'Jean Grey' },
  { id: 2, name: 'Scott Summers' },
];

const fetchData = async (id: number) => {
  await delay(10 + Math.ceil(Math.random() * 50));
  return dataList.find(d => d.id === id);
};

@Component({
  tag: 'data-fetching-fast',
  shadow: false,
  scoped: false,
})
export class DataFetchingFast {
  @State() showCode: boolean = false;
  @State() loading: boolean | null = false;
  @State() data: { id: number; name: string } | null = dataList[0];
  id: number = 2;

  handleClick = () => {
    this.loading = true;
    fetchData(this.id).then(r => {
      this.loading = false;
      this.data = r;
    });
    this.id = 1 + (this.id % dataList.length);
  };

  render() {
    const { data } = this;
    return (
      <Host>
        <h2>Data fetching fast</h2>
        <div class="fetch-btn-parent">
          <button onClick={this.handleClick}>Fetch Data</button>
        </div>
        <Stenimator
          criteria={data}
          class="base-data"
          enter="enter-top-rotate"
          exit="exit-bottom-rotate"
        >
          <span key={data.id}>{data.name}</span>
        </Stenimator>
        <CodeSection
          type="data-fetching"
          onClick={() => (this.showCode = !this.showCode)}
          show={this.showCode}
        />
      </Host>
    );
  }
}
