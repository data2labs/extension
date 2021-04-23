import { ProxyRecord } from 'storage/types';

export function replaceProxy(record: ProxyRecord) {
  const { label, value } = record;
}

export class Presenter {
  constructor(
    private readonly document: Document,
    private readonly scope: HTMLElement,
    private readonly Observer: MutationObserver
  ) {}
}
