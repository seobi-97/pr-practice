/**
 * PR 연습용 스크립트.
 * 실행: node hello.js
 */

function greet(name) {
  return `Hello, ${name}!`;
}

function greet2(name) {
  return `Hello, ${name}!`;
}

function greet3(name) {
  return `Hello, ${name}!`;
}

const target = process.argv[2] ?? "world";
console.log(greet(target));
console.log(greet2(target));
console.log(greet3(target));

module.exports = { greet , greet2};
