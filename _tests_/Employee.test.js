const Employee = require("../lib/Employee");

describe("Employee", () => {
    it("Creates employee card", () => {
        const e = new Employee();
        expect(typeof(e)).toBe("object");
    });

    it("Sets name", () => {
        const name = "Dylan";
        const e = new Employee(name);
        expect(e.name).toBe(name);
    });

    it("Sets id", () => {
        const testValue = 123;
        const e = new Employee("Dylan", testValue);
        expect(e.id).toBe(testValue);
    });

    it("Sets email", () => {
        const testValue = "dylan@email.com";
        const e = new Employee("Dylan", 3, testValue);
        expect(e.email).toBe(testValue);
    });

    describe("getName", () => {
        it("Uses getName() to get the name", () => {
            const testValue = "Dylan";
            const e = new Employee(testValue);
            expect(e.getName()).toBe(testValue);
        });
    });
        
    describe("getId", () => {
        it("Uses getId() to get the id", () => {
            const testValue = 123;
            const e = new Employee("Dylan", testValue);
            expect(e.getId()).toBe(testValue);
        });
    });
        
    describe("getEmail", () => {
        it("Uses getEmail() to get the email", () => {
            const testValue = "dylan@email.com";
            const e = new Employee("Dylan", 3, testValue);
            expect(e.getEmail()).toBe(testValue);
        });
    });
        
    describe("getRole", () => {
        it("Uses getRole() to get the role, should be Employee", () => {
            const testValue = "Employee";
            const e = new Employee("Dylan", 3, "dylan@email.com");
            expect(e.getRole()).toBe(testValue);
        });
    });
    
});