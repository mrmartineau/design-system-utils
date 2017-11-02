import get from './get'
import { ds } from '../example/myDesignSystem'

const testGet = {
  foo: 'bar',
}

test('get', () => {
  expect(get(testGet, 'foo')).toBe('bar')
  expect(get(testGet, 'bar')).toBeUndefined()
})

test('ds.get', () => {
  expect(ds.get('type.fontFamily.system')).toBe(
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans"'
  )
})
