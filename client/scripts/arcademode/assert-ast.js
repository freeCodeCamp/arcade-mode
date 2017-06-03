
/* Module to assert different properties of Abstract syntax tree (ast) generate by
 * the acorn parser.
 */

// import { expect } from 'chai';

const walk = require('acorn/dist/walk');

export function getVarNames(ast) {
  const result = [];
  walk.simple(ast, {
    VariableDeclarator(node) {
      result.push(node.id.name);
    }
  });
  return result;
}

export function getThisVarNames(ast) {
  const result = [];
  walk.simple(ast, {
    MemberExpression(node) {
      if (node.object.type === 'ThisExpression') {
        result.push(node.property.name);
      }
    }
  });
  return result;
}

export function getMemberFuncCalls(ast) {
  const result = [];
  walk.simple(ast, {
    CallExpression(node) {
      if (node.callee.type === 'MemberExpression') {
        result.push(node.callee.property.name);
      }
    }
  });
  return result;
}
