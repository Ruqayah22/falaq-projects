import { test, describe } from 'vitest';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import { App } from "../app";

describe('Testing app', () => {
    test('Testing increment', async () => {
        render(<App />)
      
        const button = screen.getByRole('button')
      
        expect(await screen.findByRole('heading', {
          name: /counter: 0/i
        })).toBeDefined()
      
        userEvent.click(button)
      
        expect(await screen.findByRole('heading', {
          name: /counter: 1/i
        })).toBeDefined()
      
        userEvent.click(button)
      
        expect(await screen.findByRole('heading', {
          name: /counter: 2/i
        })).toBeDefined()
      
        screen.logTestingPlaygroundURL()
      })
})
