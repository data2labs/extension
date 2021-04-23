import findAndReplaceDOMText from 'findandreplacedomtext';
import { ProxyRecord } from 'storage/types';

export class Presenter {
  constructor(
    private readonly scope: HTMLElement,
    private readonly Observer: typeof MutationObserver
  ) {}

  present(proxies: ProxyRecord[]) {
    this.#replaceAll(proxies);
    const observer = this.#createObserver(proxies);
    observer.observe(this.scope, { childList: true });
  }

  #replace(proxy: ProxyRecord, scope = this.scope) {
    findAndReplaceDOMText(scope, {
      find: new RegExp(proxy.label),
      replace: proxy.value,
    });
  }

  #replaceAll(proxies: ProxyRecord[], scope = this.scope) {
    proxies.forEach(proxy => this.#replace(proxy, scope));
  }

  #createObserver(proxies: ProxyRecord[]) {
    const observer = new this.Observer(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          this.#replaceAll(proxies, node as any);
        });
      });
    });
    return observer;
  }
}
