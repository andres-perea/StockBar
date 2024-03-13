describe("TC Login - Testeo", () =>
{
  beforeEach("Visitar la pagina login", () =>
  {
  cy.visit("http://localhost:5137/login") 
  cy.url().should("contain","login")
  })
  it("TC: Hacer login exitosamente", () =>
  {
    cy.get("[type= 'text']").eq(13)
      .type("AndresSanchez")
    cy.get("[type= 'password']")
      .type("12345")
    cy.get("button[type='submit']")
      .click()

    cy.contains("Cerrar sesion").should("be.visible")
  })
})