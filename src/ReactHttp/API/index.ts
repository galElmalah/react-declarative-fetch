import axios from 'axios';

interface Api {
  send(): void;
}

export class API implements Api {
  constructor(private url: string, private options: any) {}

  send(): Promise<any> {
    return axios
      .request({ url: this.url, method: 'GET', ...this.options })
      .then(res => res.data);
  }
}
