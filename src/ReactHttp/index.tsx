import * as React from 'react';
import { consumerCreator, HttpContext } from './context';
import { API } from './API';
import { Cache } from './Cache';

const DEFAULT_STATE: any = {
  error: null,
  success: false,
  fetching: false,
  data: null,
};

interface FetchProps {
  onSuccess?: (data: any) => {};
  onFailure?: (error: any) => {};
  url: string;
  options?: any;
  withCache?: boolean;
  delay?: number;
}

export interface FetchState {
  error: boolean;
  success: boolean;
  fetching: boolean;
  data: any;
  resetCache(): void;
}

export class Fetch extends React.Component<FetchProps, FetchState> {
  static Error = consumerCreator('error');
  static Fetching = consumerCreator('fetching');
  static Success = consumerCreator('success');
  private timeoutId: any;

  constructor(props: FetchProps) {
    super(props);
    this.state = {
      error: null,
      success: false,
      fetching: false,
      data: null,
      resetCache: this.resetCache,
    };
    this.timeoutId = null;
  }

  componentDidMount() {
    const { delay } = this.props;
    if (delay) {
      this.timeoutId = setTimeout(this.fetchData, delay);
      return;
    }
    this.fetchData();
  }

  componentWillUnmount() {
    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
    }
  }

  generateKey = () => {
    const { url, options = {} } = this.props;
    return `${url}, ${options.method || 'GET'}`;
  };

  resetCache = () => Cache.resetCache();

  setData = (data: any) => {
    this.props.onSuccess && this.props.onSuccess(data);
    this.setState({ ...DEFAULT_STATE, success: true, data });
  };

  setDataFromCache = (key: string) => {
    const data = Cache.get(key);
    this.setData(data);
  };

  fetchData = () => {
    const { withCache } = this.props;
    const key = this.generateKey();
    if (withCache && Cache.has(key)) {
      this.setDataFromCache(key);
      return;
    }
    this.fetchFromApi();
  };

  fetchFromApi = () => {
    const { url, options = {}, withCache, onFailure } = this.props;
    const key = this.generateKey();
    this.setState({ ...DEFAULT_STATE, fetching: true });

    const api = new API(url, options);
    api
      .send()
      .then(data => {
        if (withCache) {
          Cache.save([key, data]);
        }
        this.setData(data);
      })
      .catch(error => {
        onFailure && onFailure(error);
        this.setState({ ...DEFAULT_STATE, error });
      });
  };

  render() {
    return (
      <HttpContext.Provider value={this.state}>
        {typeof this.props.children === 'function'
          ? this.props.children(this.state)
          : this.props.children}
      </HttpContext.Provider>
    );
  }
}
