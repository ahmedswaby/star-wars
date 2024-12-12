// Add custom Jest matchers from @testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock next/router to prevent errors when testing Next.js components
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock console.error to suppress warnings in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('Warning:')) {
      return; // Suppress React warnings during testing
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
