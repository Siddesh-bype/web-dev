import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock IntersectionObserver
/* eslint-disable-next-line no-undef */
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock ResizeObserver
/* eslint-disable-next-line no-undef */
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

afterEach(() => {
  cleanup()
})

/* eslint-disable-next-line no-undef */
global.expect = expect
/* eslint-disable-next-line no-undef */
global.vi = vi
