
import { expect } from 'chai';
import * as Ast from '../../../../client/scripts/arcademode/assert-ast';

const acorn = require('acorn');

const parseOpts = {
};

describe('AssertAst', () => {
  it('Extracts declared var names from ast', () => {
    const ast = acorn.parse('let xxx = "abcd";', parseOpts);
    const varNames = Ast.getVarNames(ast);
    expect(varNames).to.have.length(1);
    expect(varNames[0]).to.equal('xxx');
  });

  it('checks that only given variables are declared', () => {
    const ast = acorn.parse('this.s1 = []; this.s2 = []; this.func = function() {};', parseOpts);
    const varNames = Ast.getThisVarNames(ast);
    expect(varNames).to.have.length(3);
    expect(varNames).to.include('s1');
    expect(varNames).to.include('s2');
    expect(varNames).to.include('func');
  });

  it('extracts all called functions', () => {
    const ast = acorn.parse('this.func = function() {}; this.func(); let a = [].sort();', parseOpts);
    const funcCalls = Ast.getMemberFuncCalls(ast);
    expect(funcCalls).to.have.length(2);
    expect(funcCalls).to.include('sort');
  });
});
