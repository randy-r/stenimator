import { Component, Host, h, State } from '@stencil/core';
import { Stenimator } from 'stenimator';
import { delay } from '../../utils/delay';
import { CodeSection } from '../Code/CodeSection';
import { Spinner } from '../Spinner/Spinner';

const dataList = [
  { id: 1, name: 'Jean Grey' },
  { id: 2, name: 'Scott Summers' },
];

const fetchData = async (id: number) => {
  await delay(400 + Math.ceil(Math.random() * 200));
  return dataList.find(d => d.id === id);
};

@Component({
  tag: 'data-fetching',
  styleUrl: 'data-fetching.css',
  shadow: false,
  scoped: false,
})
export class DataFetching {
  @State() showCode: boolean = false;
  @State() loading: boolean | null = false;
  @State() data: { id: number; name: string } | null = dataList[0];
  id: number = 1;

  handleClick = () => {
    this.loading = true;
    this.data = null;
    fetchData(this.id).then(r => {
      this.loading = false;
      this.data = r;
    });
    this.id = 1 + (this.id % dataList.length);
  };

  render() {
    const { loading, data } = this;
    return (
      <Host>
        <h2>Data fetching</h2>
        <div class="fetch-btn-parent">
          <button onClick={this.handleClick}>Fetch Data</button>
        </div>
        <Stenimator
          criteria={loading}
          class="base-data"
          enter="enter-top-rotate"
          exit="exit-bottom-rotate"
        >
          {loading === true && <Spinner class="spinner" key="spinner" />}
          {loading === false && <span key="data"> {data.name} </span>}
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
