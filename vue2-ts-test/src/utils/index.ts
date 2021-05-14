const isDone = true;
const arr = [
  { num: "1", aa: 2 },
  { num: "2" },
  { num: "3" }
];
const obj = {
  a: { num: "1" },
  b: { num: "2" },
  c: { num: "3" },
  d: { aa: 1 }
};
function d(a: any) {
  // console.trace();
  return a;
}
function c(a: any) {
  return d(a);
}

function b(a: any) {
  return c(a);
}

const a = b('123');
