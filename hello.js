/**
 * PR 연습용 스크립트.
 * 실행: node hello.js
 */

function greet(name) {
  return `Hello, ${name}!`;
}

const target = process.argv[2] ?? "world";
console.log(greet(target));

module.exports = { greet };
