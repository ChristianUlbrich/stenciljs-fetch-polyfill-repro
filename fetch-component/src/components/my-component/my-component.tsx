import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  private _imElement: HTMLImageElement;


  private async _doFetch() {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://placeimg.com/640/480/any', { headers: { 'X-Requested-With': 'Love' } });
    this._imElement.src = URL.createObjectURL(await response.blob());
  }

  render() {
    return <div>Fetched img:
      <img src="#"
           ref={ el => this._imElement = el }
      />
      <button onClick={ () => this._doFetch() }>Fetch!</button>
    </div>;
  }
}
