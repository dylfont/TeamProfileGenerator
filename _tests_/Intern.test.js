const Intern = require("../lib/Intern");

test("Sets school", () => {
  const testValue = "LSU";
  const e = new Intern("Dylan", 3, "dylan@email.com", testValue);
  expect(e.school).toBe(testValue);
});

test("Uses getRole() to get the role, should be Intern", () => {
  const testValue = "Intern";
  const e = new Intern("Dylan", 3, "dylan@email.com", "LSU");
  expect(e.getRole()).toBe(testValue);
});

test("Uses getSchool() to get the school", () => {
  const testValue = "LSU";
  const e = new Intern("Dylan", 3, "dylan@email.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});