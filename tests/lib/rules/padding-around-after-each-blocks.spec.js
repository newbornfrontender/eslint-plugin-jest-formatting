/**
 * @fileoverview Enforces single line padding around afterEach blocks
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib').rules['padding-around-after-each-blocks'];

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const invalid = `
const someText = 'abc';
afterEach(() => {
});
describe('someText', () => {
  const something = 'abc';
  // A comment
  afterEach(() => {
    // stuff
  });
  afterEach(() => {
    // other stuff
  });
});
describe('someText', () => {
  const something = 'abc';
  afterEach(() => {
    // stuff
  });
});
`;

const valid = `
const someText = 'abc';

afterEach(() => {
});

describe('someText', () => {
  const something = 'abc';

  // A comment
  afterEach(() => {
    // stuff
  });

  afterEach(() => {
    // other stuff
  });
});
describe('someText', () => {
  const something = 'abc';

  afterEach(() => {
    // stuff
  });
});
`;

ruleTester.run('padding-before-after-each-blocks', rule, {
  valid: [
    valid,
    {
      code: invalid,
      filename: 'src/component.jsx'
    }
  ],
  invalid: [
    {
      code: invalid,
      errors: 5,
      filename: 'src/component.test.jsx',
      output: valid,
    },
    {
      code: invalid,
      filename: 'src/component.test.js',
      errors: [
        {
          message: 'Expected blank line before this statement.',
          line: 3,
          column: 1
        },
        {
          message: 'Expected blank line before this statement.',
          line: 5,
          column: 1
        },
        {
          message: 'Expected blank line before this statement.',
          line: 8,
          column: 3
        },
        {
          message: 'Expected blank line before this statement.',
          line: 11,
          column: 3
        },
        {
          message: 'Expected blank line before this statement.',
          line: 17,
          column: 3
        },
      ]
    },
  ]
});
