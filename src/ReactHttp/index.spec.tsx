import * as React from 'react';
import { mount, shallow, configure } from 'enzyme';
import { Fetch } from './index';
import axios from 'axios';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import { Cache } from './Cache/index';

configure({ adapter: new EnzymeAdapter() });
jest.mock('axios');

//@ts-ignore
describe('Fetch', () => {
  let wrapper: any;
  const initWrapper = () => {
    wrapper = mount(
      <Fetch url={'someUrl'}>
        <Fetch.Fetching>
          <p>fetching</p>
        </Fetch.Fetching>
        <Fetch.Error>
          <p>Error</p>
        </Fetch.Error>
        <Fetch.Success>
          <p>Success</p>
        </Fetch.Success>
      </Fetch>
    );
  };

  it('renders ONLY the fetch component when fetching', () => {
    //@ts-ignore
    axios.request.mockResolvedValueOnce({ data: 'asd' });
    initWrapper();
    expect(wrapper.find('Fetch(errorPhase)').html()).toBe(null);
    expect(wrapper.find('Fetch(successPhase)').html()).toBe(null);
    expect(wrapper.find('Fetch(fetchingPhase)').text()).toBe('fetching');
  });

  it('renders ONLY the success component when fetching is done successfuly', done => {
    //@ts-ignore
    axios.request.mockResolvedValueOnce({ data: 'asd' });
    initWrapper();
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Fetch(errorPhase)').html()).toBe(null);
      expect(wrapper.find('Fetch(fetchingPhase)').html()).toBe(null);
      expect(wrapper.find('Fetch(successPhase)').text()).toBe('Success');
      done();
    }, 10);
  });

  it('renders ONLY the Error component when fetching as failed', done => {
    //@ts-ignore
    axios.request.mockImplementation(
      () => new Promise((res, reject) => reject('lalalal'))
    );

    initWrapper();
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('Fetch(successPhase)').html()).toBe(null);
      expect(wrapper.find('Fetch(fetchingPhase)').html()).toBe(null);
      expect(wrapper.find('Fetch(errorPhase)').text()).toBe('Error');
      done();
    }, 10);
  });

  it('get and save Data from and to cache when withCache flag is on', done => {
    //@ts-ignore
    axios.request.mockReset();
    //@ts-ignore
    axios.request.mockResolvedValueOnce({ data: 'asd' });
    Cache.get = jest.fn();
    wrapper = mount(
      <div>
        <Fetch url={'someUrl'} withCache />
        <Fetch url={'someUrl'} withCache delay={10} />
      </div>
    );
    setTimeout(() => {
      expect(axios.request).toHaveBeenCalledTimes(1);
      expect(Cache.get).toHaveBeenCalledWith('someUrl, GET');
      done();
    }, 20);
  });

  it('should delay the request by at leat the amount of time indicated', done => {
    //@ts-ignore
    axios.request.mockReset();
    //@ts-ignore
    axios.request.mockResolvedValueOnce({ data: 'asd' });
    const delayTime = 200;
    wrapper = mount(
      <div>
        <Fetch url={'someUrl'} delay={delayTime} />
      </div>
    );
    expect(axios.request).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      expect(axios.request).toHaveBeenCalledTimes(1);
      done();
    }, delayTime * 2);
  });

  it('should delay the request by at leat the amount of time indicated', done => {
    //@ts-ignore
    axios.request.mockReset();
    //@ts-ignore
    axios.request.mockResolvedValueOnce({ data: 'asd' });
    const delayTime = 200;
    wrapper = mount(
      <div>
        <Fetch url={'someUrl'} delay={delayTime} />
      </div>
    );
    expect(axios.request).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      expect(axios.request).toHaveBeenCalledTimes(1);
      done();
    }, delayTime * 2);
  });

  it('should call the onSuccess prop', done => {
    //@ts-ignore
    axios.request.mockResolvedValueOnce({ data: 'asd' });

    const mock = jest.fn();
    wrapper = mount(<Fetch url={'someUrl'} onSuccess={mock} />);
    setTimeout(() => {
      expect(mock).toHaveBeenCalledWith('asd');
      done();
    }, 10);
  });
});
