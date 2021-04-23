export class InputDecorator {
  constructor(
    private readonly scope: HTMLElement,
    private readonly Observer: typeof MutationObserver
  ) {}

  decorateInputs() {
    this.#decorateOnce();
    const observer = this.#createObserver();
    observer.observe(this.scope, { childList: true });
  }

  #decorateOnce(scope = this.scope) {
    // decorate input
  }

  #createObserver() {
    const observer = new this.Observer(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          // do stuff
        });
      });
    });
    return observer;
  }
}
