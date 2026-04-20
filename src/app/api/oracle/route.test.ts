import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';

// Mocking the gemini model
vi.mock('@/lib/gemini', () => ({
  model: {
    generateContent: vi.fn().mockResolvedValue({
      response: {
        text: () => 'Mocked Oracle Response',
      },
    }),
  },
  ORACLE_SYSTEM_PROMPT: 'You are the Oracle.',
}));

describe('Oracle API Route', () => {
  it('returns 400 if message is missing', async () => {
    const req = new Request('http://localhost/api/oracle', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Missing or invalid message.');
  });

  it('returns 400 if message is too long', async () => {
    const longMessage = 'A'.repeat(501);
    const req = new Request('http://localhost/api/oracle', {
      method: 'POST',
      body: JSON.stringify({ message: longMessage }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('returns successful response for valid input', async () => {
    const req = new Request('http://localhost/api/oracle', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello Oracle', context: { location: 'Hub' } }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.text).toBe('Mocked Oracle Response');
  });
});
