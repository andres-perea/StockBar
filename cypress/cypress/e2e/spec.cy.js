describe("TC Login - Testeo", () => {
  beforeEach("Visitar la pagina login", () => {
    cy.visit("http://localhost:5173/login");
    cy.url().should("contain", "login");
  });
  it("TC: Hacer login exitosamente", () => {;
    cy.get("[type= 'text']").type("andresSanchez");
    cy.get("[type= 'password']").type("123789");
    cy.get("button[type= 'submit']").click();
  });
});
